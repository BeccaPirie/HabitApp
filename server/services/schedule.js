import scheduleLib from "node-schedule"
import {messaging} from './firebaseAdmin.js'
import Notification from "../models/Notification.js"
import User from "../models/User.js"

const schedule = {};
schedule.createSchedule = async function (data) {
    try {
        const scheduledNotification = new Notification({
            title: data.title,
            message: data.message,
            days: data.days,
            time: data.time,
            userId: data.userId
        })

        await scheduledNotification.save()
        const dayOfWeek = data.days.join(",")
        const timeToSent = data.time.split(":")
        const hours = timeToSent[0]
        const minutes = timeToSent[1]
        const scheduleId = scheduledNotification._id.toString()
        const scheduleTimeout = `${minutes} ${hours} * * ${dayOfWeek}`

        scheduleLib.scheduleJob(scheduleId, scheduleTimeout, async () =>
        {
            const user = await User.find(data.userId)
            const tokens = []
            // TODO check if there is a token for user

            const payload = {
                tokens,
                title: data.title,
                body: data.body,
            };
            return messaging.sendMulticast(payload);
        })
    } catch (e) {
            return res.status(500).send(err)
    }
}

export default schedule