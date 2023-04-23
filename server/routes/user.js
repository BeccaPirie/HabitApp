import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import protect from '../middleware/auth.js'
import EmailValidator from 'email-validator'

const router = express.Router()

// update password
router.put('/update-password', protect, async(req, res) => {
    try {
        // check if old password is correct
        const currentUser = await User.findById(req.user._id)
        const password = await bcrypt.compare(req.body.oldPassword, currentUser.password)
        if(!password) return res.status(400).json("Incorrect password")

        // check password is valid
        if(req.body.newPassword.length < 6) {
            return res.status(400).json("Password must contain at least 6 characters")
        }
        if(req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json("Passwords don't match")
        }

        // create new password
        const bcryptPass = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.newPassword, bcryptPass)

        // update user account with new password
        await User.findByIdAndUpdate(req.user._id, {
            $set: {password: newPassword}
        })
        res.status(200).json(newPassword)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update user
router.put('/update', protect, async(req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        
        // if username is changed, check if username is taken
        if(currentUser.username !== req.body.username) {
            const checkUsername = await User.findOne({username: req.body.username})
            if(checkUsername) return res.status(409).json("Username is taken!")
        }
        
        // if email is changed, check it is valid and that it's not already in use
        if(currentUser.email !== req.body.email) {
            if(!EmailValidator.validate(req.body.email)) return res.status(400).json("Not a valid email address")
            
            const checkEmail = await User.findOne({email: req.body.email})
            if(checkEmail) return res.status(409).json("Select a different email address")
        }

        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        })
        res.status(200).json("User updated successfully")
    } catch (err) {
        res.status(500).json(err)
    } 
})

// delete user
router.delete('/', protect, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.status(200).json("User deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// get messages
router.get('/', protect, async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json(user.messages)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add message
router.put('/message', protect, async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.updateOne({$push:{
            messages: {
                message: req.body.message,
                habitId: req.body.habitId,
                userId: req.user._id,
                read:false
            }
        }})
        const updatedUser = await User.findById(req.user._id)
        res.status(200).json(updatedUser.messages)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update message
router.put('/update-message', protect, async(req, res) => {
    try{
        await User.findOneAndUpdate({
            _id: req.user._id,
            'messages._id': req.body.id
        },
        {$set: {'messages.$.read': req.body.read}},
        {new:false})
        res.status(200).send("Message updated")
    } catch(err) {
        res.status(500).send(err)
    }
})

// remove message
router.put('/remove-message', protect, async(req, res) => {
    try {
        await User.findOneAndUpdate({
            _id: req.user._id,
            'messages._id': req.body.id
        },
        {$pull: {messages: {_id: req.body.id}}})
        res.send("Message removed")
    } catch (err) {
        res.status(500).json(err)
    }
})
export default router