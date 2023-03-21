import moment from "moment"
import scheduleLib from "node-schedule"
import Notification from "../models/Notification.js"
import Habit from "../models/Habit.js"
import User from "../models/User.js"
import schedule from '../services/schedule.js'

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const notificationSettings = async(userId, habitId) => {
    // TODO dont send notification if already calendar data for current day (not sure how to do this)
    
    const user = await User.findById(userId)
    const habit = await Habit.findById(habitId)
    let newNotificationFrequency = 0

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
    
    const isAllCompleted = dates.every(date => date.status === 'Completed' || date.status === 'Skipped')
    const isAllMissed = dates.every(date => date.status === 'Missed' || date.status === 'No data')
    const isTenDaysMissed = datesTenDays.every(date => date.status === "Missed" || date.status === "No data")
    const createdAt = moment(habit.createdAt).format('YYYY-M-D')
    const fiveDays = moment().subtract(5, 'days').format('YYYY-M-D')
    const tenDays = moment().subtract(10, 'days').format('YYYY-M-D')

    // don't change notification settings if habit has been due for less than 5 days since created
    // if(fiveDays < createdAt) {
    //     console.log("< 5 days")
    // }

    // if the past 5 days the habit is due are completed, reduce the amount of notifications received
     if(isAllCompleted) {
        console.log("completed 5 days in a row")
        // delete current notification
        deleteNotification(userId, habitId)

        // update notification frequency
        let notifDays
        if(habit.notificationFrequency === 1) {
            // send every second day (every second element in array)
            notifDays = days.filter((d, i) => i % 2 === 1)  
            newNotificationFrequency++    
        }
        else if(habit.notificationFrequency === 2) {   
            // send every 4 days         
            notifDays = notifDays.filter((d, i) => i % 4 === 3)
            newNotificationFrequency++
        }
        else if(habit.notificationFrequency === 3) {
            // eventually stop notifications
            deleteNotification(userId, habitId)
        }

        // add notification and update habit
        addNotification(notifDays, habit)
        // update habit with new notification frequency
        const updatedHabit = {...habit, notificationFrequency: newNotificationFrequency}
        await Habit.findByIdAndUpdate(habit._id, {$set: updatedHabit})
    }    

    // else if 10 days missed delete notification
    else if(isTenDaysMissed) {
        console.log("10 days missed, stopping notifications")
        deleteNotification(userId, habitId)
    }

    // else if 5 days missed, start daily notifications and suggest changing event cue
    else if(isAllMissed) {
        console.log('5 days in a row missed')
        if(habit.notificationFrequency > 1) {
            deleteNotification(userId, habitId)
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
        const msg = `Try a different event cue to help integrate ${habit.name} into your routine!`
        addMessage(user, habitId, msg)
        // alert(msg, 6000, 'info')
    }

    // else if notification frequency === 1 after ten days send alert to change event cue
    else if((createdAt > tenDays) && habit.notificationFrequency === 1) {
        const msg = `Try a different event cue to help integrate ${habit.name} into your routine!`
        addMessage(user, habitId, msg)
        // alert(msg, 6000, 'info')
    }
}

// ******************** CREATE DAYS ARRAY ********************
// ******** (FIREBASE REQUIRES ARRAY 0-6 FOR SUN-MON) ********
export const createDaysArray = (daysToComplete) => {
    const days = daysToComplete.filter(day => day.toComplete === true).map(day => {
        for(let i = 0; i < dayNames.length; i++) {
            if(day.dayOfWeek === dayNames[i]) {
                return i
            }
        }
    })
    return days
}

// ******************** REFORMAT DATE ********************
const reformatDate = (date) => {
    const tmp = date.split('-')
    tmp[1] = parseInt(tmp[1]) + 1
    const newDate = `${tmp[0]}-${tmp[1]}-${tmp[2]}`
    return newDate
}

// ************ GET DATES HABIT IS DUE FOR N AMOUNT OF DAYS ************
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

// ******************** ADD NOTIFICATION ********************
const addNotification = async (days, habit) => {
    try{
      const notificationData = {
        title: habit.name,
        body: `Have you completed ${habit.name} today?`,
        days: days,
        time: habit.time,
        habitId: habit._id
    }
    await schedule.createSchedule(notificationData)

    console.log("notification created")  
    }
    catch(err) {
        console.error(err)
    } 
}

// ******************** DELETE NOTIFICATION ********************
export const deleteNotification = async (userId, habitId) => {
    try {
        // get notifications by habitId
        let notifications = await Notification.find({
            habitId: habitId,
            userId: userId
        })
        // get notification ids
        let ids = []
        if(notifications) {
            notifications.forEach(n => {
                ids.push(n._id)
            })
        }
        // delete these notifications and cancel cron jobs
        for(const id of ids) {
            console.log(id.toString())
            const list = schedule.getJobs()
            console.log(list)
            const current = list[id.toString()]
            if(!current) throw new Error("Notification not found")
            await Notification.findByIdAndDelete(id.toString())
            current.cancel()
        }
    } catch (err) {
        console.error(err)
    }
    
}

// ******************** SHOW ALERTS AND NOTIFICATIONS IN MESSAGES ********************
const addMessage = async (user, habitId, message) => {
    try {
        const newMessage = {
            message: message,
            userId: user._id,
            habitId: habitId,
            read: false
        }
        await user.updateOne({$push:{messages:newMessage}})

        } catch (err) {
        console.error(err)
    }
}
