import express from 'express'
import schedule from '../services/schedule.js'
import Notification from '../models/Notification.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/set-notification/:userId', async(req, res) => {
    try {
        const notificationData = {
            title: req.body.title,
            body: req.body.body,
            days: req.body.days,
            time: req.body.time,
            userId: req.params.userId,
        }
        await schedule.createSchedule(notificationData)
        res.status(200).json("Notification added successfully")
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/', protect, async(req, res) => {
    try {
        const list = schedule.getJobs()
        const keys = Object.keys(list)
        console.log(list)

        let schedules = await Notification.find({userId: req.user._id})
        
        schedules = schedules.filter((item) =>
            keys.includes(item._id.toString()))
        // console.log(schedules)

        res.status(200).json(schedules)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.delete('/notification', async(req, res) => {
    try {
        const jobId = req.body.id
        const list = schedule.getJobs()
        const currentJob = list[jobId]
        if (!currentJob) throw new Error("Job not found")
        await ScheduledNotification.findByIdAndRemove(jobId)
        currentJob.cancel()
        res.status(200).json("Notification deleted")
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

export default router