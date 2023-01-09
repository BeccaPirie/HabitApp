import express from 'express'
import Habit from '../models/Habit.js'
import User from '../models/User.js'

const router = express.Router()

// get habit
router.get('/:id', async(req, res) => {
    try {
        const habit = await Habit.findOne({_id:req.params.id})
        res.json(habit)
    } catch (err) {
        res.status(500).send(err)
    }    
})

// get users habits
router.get('/get-habits/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const habits = await Habit.find({userId:user._id})
        res.json(habits)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get habits due on current day
// TODO fix
router.get('/due-habits/:userId/:dayOfWeek', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const userHabits = await Habit.find({userId:user._id})

        const dueHabits = []
        for (const habit of userHabits) {
            for(let i = 0; i < habit.daysToComplete.length; i++) {
                if(habit.daysToComplete[i].dayOfWeek === req.params.dayOfWeek
                    && habit.daysToComplete[i].toComplete === true) {
                        dueHabits.push(habit)
                }
            }
        }
        res.json(dueHabits)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add habit
router.post('/add', async(req, res) => {
    const habit = new Habit({
        userId: req.body.userId,
        name: req.body.name,
        eventCues: req.body.eventCues,
        preventingActions: req.body.preventingActions,
        intentions: req.body.intentions
    })
    try {
        const newHabit = await habit.save()
        res.json(newHabit)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

// delete habit
router.delete('/:id/delete', async(req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update habit details
router.put('/update/:id', async(req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, {$set: req.body})
        console.log(habit)
    } catch (err) {
        res.status(500).json(err)
    }
})

// mark habit as completed
router.put('/:id/complete', async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.id, {
            $set: {
                habitCompleted: req.body.complete
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// update journal
router.put('/:id/journal', async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.id, {
            $set: {
                journal: req.body.journal
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// update calendar
router.put('/:id/calendar', async(req, res) => {
    try {
        const habit = await Habit.findById(req.params.id)
        const selectedDate = habit.calendarData.find({date:req.body.date})

        if(selectedDate !== undefined) {
            await habit.calendarData.updateOne({
                $push: {
                        date: req.body.date,
                        status: req.body.status
                }
            })
        } else {
            await habit.calendarData.updateOne({
                $set: {
                        date: req.body.date,
                        status: req.body.status
                }
            })
        }
        
        // TODO days missed / days completed

    } catch (err) {
        res.status(500).json(err)
    }
})

export default router