import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import generateToken from '../services/jwt-token.js'

const router = express.Router()

router.get('/', async(req, res) => {res.send("auth route")})

// register
router.post('/signup', async(req, res) => {
    try {

        // check all inputs are valid

        // check if user exists

        // create password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create user
        const createUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save user
        const user = await createUser.save()
        res.json({user: user, token: generateToken(user._id)})
    } catch (err) {
        res.status(500).json(err)
    }
})

// login
router.post('/login', async(req, res) => {
    try {
        // find user
        const loginUser = await User.findOne({username: req.body.username})
        if(!loginUser) res.status(404).json("User not found")

        // check password
        const loginPassword = await bcrypt.compare(loginUser.password, req.body.password)
        if(!loginPassword) res.status(400).json("Incorrect password")

        res.json({user: loginUser, token: generateToken(loginUser._id)})
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router