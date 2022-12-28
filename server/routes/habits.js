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
router.put('/:id/update', async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.id, {
            $set: {
              name: req.body.name,
              eventCues: req.body.eventCues,
              // TODO days to complete
              preventingActions: req.body.preventing,
              intentions: req.body.intentions
            }
        })
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