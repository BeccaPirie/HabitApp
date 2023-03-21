import moment from "moment"
import User from "../models/User.js"
import Habit from "../models/Habit.js"
import {
    createDaysArray,
    reformatDate,
    getDates,
    addMessage,
    deleteNotification,
    addNotification
} from "../services/notifications.js"

export const checkCalendarData = async(habit) => {
    const user = await User.findById(habit.userId)
    let newNotificationFrequency = 0
    let message = ''

    // reformat calendarData dates
    const reformatData = habit.calendarData.map(({date, ...data}) => ({
        date: reformatDate(date),
        ...data
    }))

    // use filter to find days habit is to be completed
    const daysToComplete = habit.daysToComplete.filter(day => day.toComplete === true)
    // now need to get number corresponding with day
    const days = createDaysArray(daysToComplete)
    // get dates for past 5 and 10 days habit was due
    const dates = getDates(days, 35, 5)
    const datesTenDays = getDates(days, 70, 10)

    // find calendar data that matches each date
    dates.forEach(date => {
        const matchingDate = reformatData.find(data => data.date === date.date)
        if(matchingDate) return date.status = matchingDate.status
        else return date.status = "No data"
    })
    datesTenDays.forEach(date => {
        const matchingDate = reformatData.find(data => data.date === date.date)
        if(matchingDate) return date.status = matchingDate.status
        else return date.status = "No data"
    })

    const isFiveDaysMissed = dates.every(date => date.status === 'No data')
    const isTenDaysMissed = datesTenDays.every(date => date.status === "No data")
    const createdAt = moment(habit.createdAt).format('YYYY-M-D')
    const fiveDays = moment().subtract(5, 'days').format('YYYY-M-D')
    const tenDays = moment().subtract(10, 'days').format('YYYY-M-D')

    // don't change notification settings if habit has been due for less than 5 days since created
    if(fiveDays < createdAt || user.notificationFrequency === 3) {
        console.log("no updates requred")
    }

    // else if 10 days missed delete notification
    else if(isTenDaysMissed) {
        console.log("10 days missed, stopping notifications")
        deleteNotification(user._id, habit._id)
        const updatedHabit = {...habit, notificationFrequency: 0}
        await Habit.findByIdAndUpdate(habit._id, {$set: updatedHabit})
    }

    // else if 5 days missed, start daily notifications and suggest changing event cue
    else if(isFiveDaysMissed) {
        console.log('5 days in a row missed')
        if(habit.notificationFrequency > 1) {
            deleteNotification(user._id, habit._id)
            newNotificationFrequency = 1

            // use filter to find days habit is to be completed
            const daysToComplete = habit.daysToComplete.filter(day => day.toComplete === true)
            // now need to get number corresponding with day
            const days = createDaysArray(daysToComplete)
            addNotification(days, habit)
            // update habit with new notification frequency
            const updatedHabit = {...habit, notificationFrequency: newNotificationFrequency}
            await Habit.findByIdAndUpdate(habit._id, {$set: updatedHabit})
        }
        message = `Try a different event cue to help integrate ${habit.name} into your routine!`
        addMessage(user, habit._id, message)
    }

    // else if notification frequency === 1 after ten days send alert to change event cue
    else if((createdAt > tenDays) && habit.notificationFrequency === 1) {
        message = `Try a different event cue to help integrate ${habit.name} into your routine!`
        addMessage(user, habit._id, message)
    }

    return message
}