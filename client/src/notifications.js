import moment from "moment"

const days = [0, 1, 2, 3, 4]
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ******************** CREATE DAYS ARRAY ********************
// ******** (FIREBASE REQUIRES ARRAY 0-6 FOR SUN-MON) ********
export const createDaysArray = (daysToComplete) => {
    const days = daysToComplete.map(day => {
        for(let i = 0; i < dayNames.length; i++) {
            if(day.dayOfWeek === dayNames[i]) {
                return i
            }
        }
    })
    return days
}

// ******************** CALL API TO ADD NOTIFICATION ********************
export const addNotification = async (days, axiosJWT, habit, user) => {
    await axiosJWT.post(`http://localhost:5000/server/notification/set-notification`, {
        title: habit.name,
        body: `Have you completed ${habit.name} today?`,
        days: days,
        time: '18:00', // TODO let users select morning/afternoon/evening
        habitId: habit._id
    }, {
        headers: {authorization:'Bearer ' + user.token}
    })
    console.log("notification created")
}

// ******************** CALL API TO DELETE NOTIFICATION ********************
// FIXME
export const deleteNotification = async (axiosJWT, habit, user) => {
    const res = await axiosJWT.get(`http://localhost:5000/server/notification/${habit._id}`, {
        headers: {authorization:'Bearer ' + user.token}
    })
    console.log(res.data)

    let ids = []
    if(res.data) {
        res.data.forEach(n => {
            ids.push(n._id)
        })
    }

    if(ids.length > 0) {
        await axiosJWT.delete('http://localhost:5000/server/notification', {ids: ids}, {
            headers: {authorization: 'Bearer ' + user.token}
        })
        console.log("notification deleted")
    }
}

// ******************** UPDATE NOTIFICATION FREQUENCY ********************
export const notificationSettings = (habit, dispatch, axiosJWT, user) => {
    // TODO dont send notification if already calendar data for current day (not sure how to do this)

    let newNotificationFrequency = 0

    // reformat date function
    const reformatDate = (date) => {
        const tmp = date.split('-')
        tmp[1] = parseInt(tmp[1]) + 1
        const newDate = `${tmp[0]}-${tmp[1]}-${tmp[2]}`
        return newDate
    }
    
    // update habit function
    const updateHabit = async () => {
        // update habit with new notification frequency
        const updatedHabit = {...habit, notificationFrequency: newNotificationFrequency}
        await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, updatedHabit, {
            headers: {authorization:'Bearer ' + user.token}
        })
        dispatch({type: "UPDATE_HABIT", payload: habit})
        console.log("habit updated")
    }

    // reformat calendarData dates
    const reformatData = habit.calendarData.map(({date, ...data}) => ({
        date: reformatDate(date),
        ...data
    }))

    // TODO change to last 5 days when habit was due
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
        deleteNotification(axiosJWT, habit, user)
        
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

        // add notification and update habit
        addNotification(notifDays, axiosJWT, habit, user)
        updateHabit()
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
            deleteNotification(axiosJWT, habit, user)
            newNotificationFrequency = 1

            // use filter to find days habit is to be completed
            const daysToComplete = habit.daysToComplete.filter(day => day.toComplete === true)
            // now need to get number corresponding with day
            const days = createDaysArray(daysToComplete)
            addNotification(days, axiosJWT, habit, user)
            updateHabit()
        }
        alert(`Try a different event cue to help integrate ${habit.name} into your routine!`, 6000)
    }

    // If __ days missed delete notifications
    const isAllMissed = dates.every(date => date.status === "Missed" || date.status === "No data")
    if(isAllMissed) {
        console.log("all days missed")
    }

    // if notifications are still daily after two weeks, get user to change event cue ?? - add creation date to habit
    // if notification frequency === 1 after two weeks (use moment to get date)
    // send alert to change event cue

    // reduce notifications (every/one) month if still daily
    // use moment to get date
    // reduce by ...
    
}