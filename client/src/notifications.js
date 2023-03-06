import moment from "moment"
import { createDaysArray } from "./utils"
import axios from "axios"

const days = [0, 1, 2, 3, 4]

export const notificationSettings = (habit, dispatch, axiosJWT, user) => {
    // TODO dont send notification if already calendar data for current day (not sure how to do this), or if habit completed

    let newNotificationFrequency = 0

    // reformat date function
    const reformatDate = (date) => {
        const tmp = date.split('-')
        tmp[1] = parseInt(tmp[1]) + 1
        const newDate = `${tmp[0]}-${tmp[1]}-${tmp[2]}`
        return newDate
    }
    
    // add notification function
    const addNotification = async (days) => {
        await axios.put(`http://localhost:5000/server/notification/set-notification/${habit.userId}`, {
            title: habit.name,
            message: `Have you completed ${habit.name} today?`,
            days: days,
            time: '18:00' // TODO let users select morning/afternoon/evening
        })

        // update habit with new notification frequency
        const updatedHabit = {...habit, notificationFrequency: newNotificationFrequency}
        await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, updatedHabit, {
            headers: {authorization:'Bearer ' + user.token}
        })
        dispatch({type: "UPDATE_HABIT", payload: habit})
    }

    // delete notification function
    const deleteNotification = async () => {
        // TODO check if notification exists
        await axiosJWT.delete(`http://localhost:5000/server/notification/${habit._id}`, {
            headers: {authorization:'Bearer ' + user.token}
        })
    }

    // reformat calendarData dates
    const reformatData = habit.calendarData.map(({date, ...data}) => ({
        date: reformatDate(date),
        ...data
    }))

    // get dates for past 5 days
    let dates = []
    days.forEach(day => {
        const date = moment().subtract(day, 'day').format('YYYY-M-D')
        dates.push({date: date, status: ''})
    })
    
    // find calendar data that matches each date
    dates.forEach(date => {
        const matchingDate = reformatData.find(data => data.date === date.date)
        if(matchingDate) return date.status = matchingDate.status
        else return date.status = "No data"
    })

    // if all days completed half the amount of notifications received
    const isAllCompleted = dates.every(date => date.status === 'Completed')

    if(isAllCompleted) {
        console.log("all days completed")
        // delete current notification
        deleteNotification()
        
        // use filter to find days habit is to be completed
        const daysToComplete = habit.daysToComplete.filter(day => day.toComplete === true)
        // now need to get number corresponding with day
        const days = createDaysArray(daysToComplete)

        // update notification frequency
        let notifDays
        if(habit.notificationFrequency === 1) {
            // send every second day (every second element in array)
            notifDays = days.filter((d, i) => i % 2 === 1)  
            newNotificationFrequency++          
        }
        else if(habit.notificationFrequency === 2) {            
          notifDays = notifDays.filter((d, i) => i % 3 === 2)
          newNotificationFrequency++
        }
        else if(habit.notificationFrequency === 3) {
            // eventually stop notifications
        } 

        // add notification
        addNotification(notifDays)
    }

    // count number of days missed
    let count = 0
    dates.forEach(date => {
        if(date.status === 'Missed' || date.status === 'No data') return count++
    })
    
    // if 5 or more days missed, start daily notifications and suggest event cue change
    if(count >= 5) {
        console.log(`${count} days missed`)
        if(habit.notificationFrequency > 1) {
            deleteNotification()
            newNotificationFrequency = 1

            // use filter to find days habit is to be completed
            const daysToComplete = habit.daysToComplete.filter(day => day.toComplete === true)
            // now need to get number corresponding with day
            const days = createDaysArray(daysToComplete)
            addNotification(days)
        }
        // TODO suggest changing event cue
    }

    // If __ days missed delete notifications
    const isAllMissed = dates.every(date => date.status === "Missed" || date.status === "No data")
    if(isAllMissed) {
        console.log("all days missed")
    }

    // if notifications are still daily after two weeks, get user to change event cue ??
    // reduce notifications every month if still daily to once a week ??
    // message to let user know notification setting has been changed ??
}