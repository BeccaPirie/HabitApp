import express from 'express'
import schedule from '../services/schedule.js'

const router = express.Router()

router.post('/set-notification/:userId', async(req, res) => {
    try {
        const notificationData = {
            title: req.body.title,
            message: req.body.message,
            days: req.body.days,
            time: req.body.time,
            userId: req.params.userId
        }
        const notification = await schedule.createSchedule(notificationData)
        res.json(notification)
    } catch (err) {
        res.status(500).send(err)
    }
})

// TODO
router.get('/notification', async(req, res) => {})
router.delete('/notification', async(req, res) => {})

export default router