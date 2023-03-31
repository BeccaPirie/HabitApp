import scheduleLib from "node-schedule"
import { firebaseAdmin } from './firebaseAdmin.js'
import Notification from "../models/Notification.js"
import User from "../models/User.js"
import Habit from "../models/Habit.js"
import { checkCalendarData } from "./check-notifs.js"

const schedule = {};

// fetch all notifications
schedule.getJobs = function () {
    return scheduleLib.scheduledJobs
}

// check if habits need updated
schedule.dailyCheck = async() => {
    try {
        const daysOfWeek = "0,1,2,3,4,5,6"
        const scheduleTimeout = `00 13 * * ${daysOfWeek}`

        scheduleLib.scheduleJob("id", scheduleTimeout, async () => {
            const habits = await Habit.find({})

            habits.forEach(async(habit) => {
                const res = checkCalendarData(habit)
                if(res.data === undefined || res.data === '') return

                // find users tokens
                const user = await User.findById(data.userId)
                // update firebase token
                let tokens
                if(user.firebaseToken) {
                    tokens = user.firebaseToken
                }
                // payload for creating notification
                const payload = {
                    tokens: tokens,
                    title: 'Habit App',
                    body: res.data,
                }
                return firebaseAdmin.sendMulticastNotification(payload);
            })
        })
    } catch (error) {
       return res.send(err)
    }   
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
        console.log(scheduledNotification)

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
            // find user and habit
            const user = await User.findById(data.userId)
            const habit = await Habit.findById(data.habitId)

            // add new message
            const newMessage = {
                message: `Have you completed ${habit.name} today?`,
                userId: user._id,
                habitId: habit._id,
                read: false
            }
            await user.updateOne({$push:{messages:newMessage}})

            // update firebase token
            let tokens
            if(user.firebaseToken) {
                tokens = user.firebaseToken
            }

            // payload for creating notification
            const payload = {
                tokens: tokens,
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
                const user = await User.find(scheduledNotification.userId)
                let token
                if(user.token) {
                    token = user.token
                }
    
                const payload = {
                    token,
                    title: scheduledNotification.notification.title,
                    body: scheduledNotification.notification.body,
                }
                return firebaseAdmin.sendMulticastNotification(payload);
          })
        })
     } catch (e) {
        return res.status(500).send(err)
     }
}

export default schedule