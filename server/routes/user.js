import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import protect from '../middleware/auth.js'

const router = express.Router()

// update password
router.put('/update-password', protect, async(req, res) => {
    try {
        const password = await bcrypt.compare(req.user.password, req.body.oldPassword)

        if(!password) {
            res.status(400).json("Incorrect password")
        }

        else {
            // create new password
            const bcryptPass = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(req.body.newPassword, bcryptPass)

            // update user account with new password
            await User.findByIdAndUpdate(req.params.id, {
                $set: {password: newPassword}
            })
            res.status(200).json(newPassword)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// update user
router.put('/update', protect, async(req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router