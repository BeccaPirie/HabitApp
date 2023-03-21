import moment from "moment"
import scheduleLib from "node-schedule"
import Notification from "../models/Notification.js"
import User from "../models/User.js"
import Habit from "../models/Habit.js"
import schedule from '../services/schedule.js'

const scheduleCheck = {};

const habits = await Habit.find({})
habits.forEach(habit => checkCalendarData(habit))

const checkCalendarData = async(habit) => {
    // reformat date function
    const reformatDate = (date) => {
        const tmp = date.split('-')
        tmp[1] = parseInt(tmp[1]) + 1
        const newDate = `${tmp[0]}-${tmp[1]}-${tmp[2]}`
        return newDate
    }
    
    // function for getting dates habit is due for n amount of days
    const getDates = (days, n, t) => {
        // get past dates for when habit was due
        let dates = []
        // iterate through past n days
        for(let i = 0; i < n; i++) {
            const date = moment().subtract(i, 'day').format('YYYY-M-D')
            // check if habit is due on current day of week
            const dayOfWeek = moment(date).day()
            if(!days.includes(dayOfWeek)) continue
            dates.push({date: date, status: ''})
            // once the length = t, break out of loop
            if(dates.length >= t) break
        }
        return dates
    }

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
    if(fiveDays < createdAt) {
        console.log("< 5 days")
    }

    // else if 10 days missed delete notification
    else if(isTenDaysMissed) {
        // get notifications by habitId
        let notifications = await Notification.find({userId: req.user._id})
        // get notification ids
        let ids = []
        if(notifications) {
            notifications.forEach(n => {
                ids.push(n._id)
            })
        }
        // delete these notifications and cancel cron jobs
        for(const id of ids) {
            const list = schedule.getJobs()
            const current = list[id]
            if(!current) throw new Error("Notification not found")
            await Notification.findByIdAndDelete(req.params.id)
            current.cancel()
        }
    }

    // else if 5 days missed, start daily notifications and suggest changing event cue
    else if(isFiveDaysMissed) {
        // check if notifications are already daily
        // get notifications by habitId
        // delete these notifications
        // cancel cron job
        // notification frequency === 1
        // find days habit is to be completed after
        // call create days array
        // call create schedule
        // update habit with new notification frequency
        // send alert/notification to user
    }

    // else if notification frequency === 1 after ten days send alert to change event cue
    else if((createdAt > tenDays) && habit.notificationFrequency === 1) {
        // send alert/notification to user
    }
}

// ******************** CREATE DAYS ARRAY ********************
// ******** (FIREBASE REQUIRES ARRAY 0-6 FOR SUN-MON) ********
const createDaysArray = (daysToComplete) => {
    const days = daysToComplete.filter(day => day.toComplete === true).map(day => {
        for(let i = 0; i < dayNames.length; i++) {
            if(day.dayOfWeek === dayNames[i]) {
                return i
            }
        }
    })
    return days
}