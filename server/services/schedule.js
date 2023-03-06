import scheduleLib from "node-schedule"
import { firebaseAdmin } from './firebaseAdmin.js'
import Notification from "../models/Notification.js"
import User from "../models/User.js"

const schedule = {};

// fetch all notifications
schedule.getJobs = function () {
    return scheduleLib.scheduledJobs
}

schedule.createSchedule = async(data) => {
    try {
        // create new notification
        const scheduledNotification = new Notification({
            time: data.time,
            days: data.days,
            notification: {
                title: data.title,
                body: data.body,
            },
            userId: data.userId,
            habitId: data.habitId
        })

        // save to database
        await scheduledNotification.save()
        // set data required for scheduling
        const dayOfWeek = data.days.join(",")
        const timeToSend = data.time.split(":")
        const hours = timeToSend[0]
        const minutes = timeToSend[1]
        const scheduleId = scheduledNotification._id.toString()
        const scheduleTimeout = `${minutes} ${hours} * * ${dayOfWeek}`

        // schedule notification
        scheduleLib.scheduleJob(scheduleId, scheduleTimeout, async () => {            
            // find users token
            const user = await User.findById(data.userId)

            let tokens
            if(user.firebaseToken) {
                tokens = user.firebaseToken
            }

            const payload = {
                tokens,
                title: data.title,
                body: data.body,
            }
            
            return firebaseAdmin.sendMulticastNotification(payload);
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

// Reschedule notifications when server restarted
schedule.reSchedule = async function () {
    try {
        const scheduledNotifications = await Notification.find({})
        scheduledNotifications.forEach((scheduledNotification) => {
            const dayOfWeek = scheduledNotification.days.join(",")
            const timeToSent = scheduledNotification.time.split(":")
            const hours = timeToSent[0]
            const minutes = timeToSent[1]
            const scheduleId = scheduledNotification._id.toString()
            const scheduleTimeout = `${minutes} ${hours} * * ${dayOfWeek}`
            
            scheduleLib.scheduleJob(scheduleId, scheduleTimeout, async () => {
                const user = await User.find(data.userId)
                let token
                if(user.token) {
                    token = user.token
                }
    
                const payload = {
                    token,
                    title: data.title,
                    body: data.body,
                }
                return firebaseAdmin.sendMulticastNotification(payload);
          })
        })
     } catch (e) {
        return res.status(500).send(err)
     }
}

export default schedule