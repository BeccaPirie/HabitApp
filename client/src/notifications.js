import moment from "moment"
import axios from "axios"
import HabitList from "./components/HabitList"

const days = [0, 1, 2, 3, 4]
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default async function notificationSettings(habit) {
    // reformat date function
    const reformatDate = (date) => {
        const tmp = date.split('-')
        tmp[1] = parseInt(tmp[1]) + 1
        const newDate = `${tmp[0]}-${tmp[1]}-${tmp[2]}`
        return newDate
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

        // TODO
        // check if notification exists for habit - add schedule id to habit ????
        // if it exists, delete current scheduled notifications
        // dont send notification if already calendar data for current day - not sure how to do this
        
        // use filter to find days habit is to be completed
        const daysToComplete = habit.daysToComplete.filter(day => day.toComplete === true)

        // now need to get number corresponding with day
        const days = daysToComplete.map(day => {
            for(let i = 0; i < dayNames.length; i++) {
                if(day.dayOfWeek === dayNames[i]) {
                    return i
                }
            }
        })

        // update notification frequency
        let notifDays
        if(habit.notificationFrequency === 1) {
            // send every second day (every second element in array)
            notifDays = days.filter((d, i) => i % 2 === 1)
            habit.notificationFrequency = 2
        }
        else if(habit.notificationFrequency === 2) {            
          notifDays = notifDays.filter((d, i) => i % 3 === 2)
          habit.notificationFrequency = 3
        }
        else if(habit.notificationFrequency === 3) {

        }
        // eventually stop notifications

        // add notification
        // await axios.put(`http://localhost:5000/server/notification/set-notification/${habit.userId}`, {
        //     title: habit.name,
        //     message: `Have you completed ${habit.name} today?`,
        //     days: notifDays,
        //     time: '18:00' // let users select morning/afternoon/evening
        // })

        // add schedule id to habit ??
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
            habit.notificationFrequency = 1
        }
        // suggest changing event cue
    }

    // If __ days missed delete notifications
    const isAllMissed = dates.every(date => date.status === "Missed" || date.status === "No data")
    if(isAllMissed) {
        console.log("all days missed")
    }

    // if notifications are still daily after two weeks, get user to change event cue ??
    // reduce notifications every month if still daily to once a week ??
    // length of time to reduce notifications based on individual habit ??
    // message to let user know notification setting has been changed ??
    
}