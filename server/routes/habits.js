import express from 'express'
import Habit from '../models/Habit.js'

const router = express.Router()

router.get('/', async(req, res) => {res.send("habit route")})

// add habit
router.post('/add', async(req, res) => {
    const habit = new Habit(req.body)
    try {
        await habit.save()
    }
    catch (err) {

    }
})

// delete habit
router.delete('/:id/delete', async(req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id)
    } catch (err) {
        
    }
})

// update habit details
router.put('/:id/update', async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.id, {
            $set: {

            }
        })
    } catch (err) {
        
    }
})

// update calendar
router.put('/id/calendar', async(req, res) => {

})

export default router