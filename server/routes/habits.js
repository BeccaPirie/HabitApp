import express from 'express'
import Habit from '../models/Habit.js'
import User from '../models/User.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// get habit
router.get('/get-habit/:habitId', protect, async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const habit = await Habit.findOne({
            _id: req.params.habitId,
            userId: user._id
        })
        res.json(habit)
    } catch (err) {
        res.status(500).send(err)
    }    
})

// get users habits
router.get('/get-habits', protect, async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const habits = await Habit.find({userId:user._id})
        res.json(habits)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add habit
router.post('/add', protect, async(req, res) => {
    const habit = new Habit(req.body)
    try {
        const newHabit = await habit.save()
        res.json(newHabit)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

// delete habit
router.delete('/delete/:id', protect, async(req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id)
        res.json("habit deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// update habit
router.put('/update/:habitId', protect, async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.habitId, {$set: req.body})
        res.json("habit updated")
    } catch (err) {
        res.status(500).json(err)
    }
})

// mark habit as completed
router.put('/complete/:id', protect, async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.id, {
            $set: {
                habitCompleted: req.body.complete
            }
        })
        res.json("habit updated")
    } catch (err) {
        res.status(500).json(err)
    }
})

// update journal
router.put('/journal/:id', protect, async(req, res) => {
    try {
        await Habit.findByIdAndUpdate(req.params.id, {
            $set: {
                journal: req.body.journal
            }
        })
        res.json("journal updated")
    } catch (err) {
        res.status(500).json(err)
    }
})

// update calendar data
router.put('/:id/update-calendar-data', protect, async (req, res) => {
    try {
        await Habit.findOneAndUpdate({
            _id: req.params.id,
            'calendarData.date': req.body.date
        },
        {$set: {'calendarData.$.status': req.body.status}},
        {new: true})

        const updatedHabit = await Habit.findById(req.params.id)
        res.json(updatedHabit)
    } catch (err) {
        res.status(500).json(err)
    }
})

// remove calendar data
router.put('/:id/remove-calendar-data', protect, async(req, res) => {
    try {
        await Habit.findOneAndUpdate({
            _id: req.params.id,
            'calendarData.date': req.body.date
        },
        {$pull: {calendarData: {date: req.body.date}}})

        const updatedHabit = await Habit.findById(req.params.id)
        res.json(updatedHabit)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add calendar data
router.put('/:id/add-calendar-data', protect, async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id)
        await habit.updateOne({$push:{
            calendarData: {
                date: req.body.date,
                status: req.body.status 
            }
            }})
        const updatedHabit = await Habit.findById(req.params.id)
        res.json(updatedHabit)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add todo
router.put('/add-todo', protect, async(req, res) => {
    try {
        const user = User.findById(req.user._id)
        user.updateOne({$push: {
                todos: {
                    todo: req.body.todo,
                    isComplete: false
                }
            }})
        const updatedUser = User.findById(req.user._id)
        res.status(200).json(updatedUser.todos)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update todo
router.put('/update-todo', protect, async(req, res) => {
    try {
        User.findOneAndUpdate({
            id: req.user._id,
            'todos._id': req.body.id
        }, 
        {$set: {
            'todos.$.todo': req.body.todo,
            'todos.$.isComplete': req.body.isComplete
        }},
        {new:false})
        res.status(200).json("Todo updated")
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete todo
router.put('/remove-todo', protect, async(req, res) => {
    try {
        User.findOneAndUpdate({
            id: req.user._id,
            'todos._id': req.body.id
        }, 
        {$pull: {_id: req.body.id}},
        {new:false})
        res.status(200).json("Todo removed")
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router