import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { generateToken, generateRefreshToken } from '../services/jwt-token.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import EmailValidator from 'email-validator'
dotenv.config()

const router = express.Router()

// register
router.post('/signup', async(req, res) => {
    try {

        // check password is valid
        if(req.body.password.length < 6) {
            return res.status(400).json("Password must contain at least 6 characters")
        }
        if(req.body.password !== req.body.confirmPassword) {
            return res.status(400).json("Passwords don't match")
        }

        // check if email is valid
        if(!EmailValidator.validate(req.body.email)) {
            return res.status(400).json("Not a valid email address")
        }

        // check if user exists
        const checkUsername = await User.findOne({username: req.body.username})
        if(checkUsername) return res.status(409).json("Username is taken!")

        const checkEmail = await User.findOne({email: req.body.email})
        if(checkEmail) return res.status(409).json("Account already exists!")

        // create password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create user
        const createUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        // save user
        const user = await createUser.save()

        // generate JWT tokens
        const token = generateToken(user._id).toString()
        const refreshToken = generateRefreshToken(user._id).toString()

        // update user with JWT tokens
        await user.updateOne({
            $set: {
                token: token,
                refreshToken: refreshToken
            }
        })

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: token,
            refreshToken: refreshToken
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// login
router.post('/login', async(req, res) => {
    try {
        // check for user
        const loginUser = await User.findOne({email: req.body.email})
        const isValid = await bcrypt.compare(req.body.password, loginUser.password)
        if(!loginUser || !isValid) return res.status(404).json("Username or password is incorrect")

        // generate new JWT tokens
        const token = await generateToken(loginUser._id)
        const refreshToken = await generateRefreshToken(loginUser._id)

        // update user with new tokens
        await loginUser.updateOne({
            $set: {
                token: token,
                refreshToken: refreshToken
            }
        })

        res.status(200).json({
            _id: loginUser._id,
            username: loginUser.username,
            email: loginUser.email,
            token: token,
            refreshToken: refreshToken,
            messages: loginUser.messages,
            notifications: loginUser.notifications,
            todos: loginUser.todos
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// create refresh token
router.post('/refresh-token', async(req, res) => {
    // get user
    const user = await User.findById(req.body.id)
    // get token
    const refreshToken = req.body.token
    
    // send error if token doesn't exist or is not valid
    if (!refreshToken) res.status(401).json("Not authenticated")
    if(refreshToken !== user.refreshToken) return res.status(403).json("Token not valid")

    // verify and create new tokens
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async(err, decoded) => {
        if(err) {
            console.error(err)
        }
        // generate new JWT tokens
        const newAccessToken = await generateToken(decoded.id)
        const newRefreshToken = await generateRefreshToken(decoded.id)

        // update user with new tokens
        await User.findByIdAndUpdate(decoded.id, {
            $set: {
                token: newAccessToken,
                refreshToken: newRefreshToken
            }
        })

        res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
        })
    })
})

// update user with FCM register token
router.put('/firebase-token', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)

        if(user.firebaseToken.includes(req.body.firebaseToken)) {
            res.json("token already added")
        }
        else if(req.body.firebaseToken === "") {
            res.json("no token")
        }
        else {
            await user.updateOne({
                $push: {
                    firebaseToken: req.body.firebaseToken
                }
            })
            res.status(200).json({
                firebaseToken: user.firebaseToken
            })
        }
 
        
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router