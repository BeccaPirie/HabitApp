import express from 'express'
import schedule from '../services/schedule.js'
import Notification from '../models/Notification.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// create notification
router.post('/set-notification', protect, async(req, res) => {
    try {
        const notificationData = {
            title: req.body.title,
            body: req.body.body,
            days: req.body.days,
            time: req.body.time,
            userId: req.user._id,
            habitId: req.body.habitId
        }
        await schedule.createSchedule(notificationData)
        res.status(200).json("Notification added successfully")
    } catch (err) {
        res.status(500).send(err)
    }
})

// get users notifications
router.get('/', protect, async(req, res) => {
    try {
        const list = schedule.getJobs()
        const keys = Object.keys(list)
        console.log(list)

        let schedules = await Notification.find({userId: req.user._id})
        
        // schedules = schedules.filter((item) =>
        //     keys.includes(item._id.toString()))
        // console.log(schedules)

        res.status(200).json(schedules)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

// get the notifications for a habit
router.get('/:habitId', protect, async(req, res) => {
    try {
        const list = schedule.getJobs()
        const keys = Object.keys(list)

        let schedules = await Notification.find({
            userId: req.user._id,
            habitId: req.params.habitId
        })
        
        schedules = schedules.filter((item) =>
            keys.includes(item._id.toString()))

        res.status(200).json(schedules)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

// delete notification
router.delete('/:id', protect, async(req, res) => {
    try {
         const list = schedule.getJobs()
         const current = list[req.params.id]
         if(!current) throw new Error("Notification not found")
        await Notification.findByIdAndDelete(req.params.id)
        current.cancel()
        res.status(200).json("Notification deleted")
    } catch (err) {
        res.status(400).json(err)
    }
})

export default router