import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import protect from '../middleware/auth.js'

const router = express.Router()

// get user
// router.get('/', async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id)
//         res.json(user)
//     } catch (error) {
//         res.status(500).json(err)
//     }
// })

// update password
router.put('/:id/update-password', async(req, res) => {
    // only update own account
    if(req.body.id === req.params.id) {
        try {
        const user = await User.findById(req.params.id)
        const password = await bcrypt.compare(req.body.password, user.password)

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
        }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can only update your own account")
    } 
})

// update user
router.put('/:id', async(req, res) => {
    // only update own account
    if(req.body.id == req.params.id) {
       try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        })
        } catch (err) {
            res.status(500).json(err)
        } 
    } else {
        res.status(403).json("You can only update your own account")
    }
})

// delete user
router.delete('/:id', async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router