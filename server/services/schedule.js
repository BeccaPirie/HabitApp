import scheduleLib from "node-schedule"
import firebaseAdmin from "../firebaseAdmin.js"
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
            // const chunks = _.chunk(users, 500)

            // const promises = chunks.map((u) => {
            // const tokens = []
            // u.forEach((item) => {
            //     if (item.token) {
            //         tokens.push(item.token)
            //     }
            // })

            // const payload = {
            //     tokens,
            //     title: data.title,
            //     body: data.body,
            // };
            return firebaseAdmin.sendMulticastNotification(payload);
        })
            // await Promise.all(promises)
        // })
    } catch (e) {
            return res.status(500).send(err)
    }
}

export default schedule