import express from 'express'
import Habit from '../models/Habit.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async(req, res) => {res.send("user route")})

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

// delete user
router.delete('/:id', async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get users habits
router.get('/get-habits/:id', async(req, res) => {
    try {
        // use ids stored in array to find habits
        const user = await User.findById(req.params.id)
        const habits = await Promise.all(
            user.habits.map((habitId) => {
                return Habit.findOne({id:habitId})
            })
        )
        res.json(habits)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add habit to users list
router.put('/add-habit/:habitId', async (req, res) => {
    try {
        // push habit id to array
        await User.findByIdAndUpdate(req.body.userId, {
            $push:{
                habits: req.params.habitId
            }
        })
        res.json(`habit ${req.params.habitId} added to user ${req.body.userId}`)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router