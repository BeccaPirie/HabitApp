import express from 'express'
import Habit from '../models/Habit.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/', async(req, res) => {res.send("user route")})

// update user
router.put('/:id', async(req, res) => {
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
})

// update password
router.put('/:id/update-password', async(req, res) => {

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
router.get('/:id/get-habits', async(req, res) => {
    try {
        const habits = await Promise.all(
            req.params.id.habits.map((habitId) => {
                return Habit.findById(habitId)
            })
        )
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router