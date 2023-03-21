import moment from "moment"

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ******************** UPDATE NOTIFICATION FREQUENCY ********************
export const notificationSettings = (habit, dispatch, axiosJWT, user, userDispatch, alert) => {
    // TODO dont send notification if already calendar data for current day (not sure how to do this)
    // TODO only call function if notifications are on?

    let newNotificationFrequency = 0

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
    if(fiveDays < createdAt) {
        console.log("< 5 days")
    }

    // if the past 5 days the habit is due are completed, reduce the amount of notifications received
    else if(isAllCompleted) {
        console.log("completed 5 days in a row")
        // delete current notification
        deleteNotification(axiosJWT, habit, user)

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
            deleteNotification()
        }

        // add notification and update habit
        addNotification(notifDays, axiosJWT, habit, user)
        updateHabit()
    }    

    // else if 10 days missed delete notification
    else if(isTenDaysMissed) {
        console.log("10 days missed, stopping notifications")
        deleteNotification(axiosJWT, habit, user)
    }

    // else if 5 days missed, start daily notifications and suggest changing event cue
    else if(isAllMissed) {
        console.log('5 days in a row missed')
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
        const msg = `Try a different event cue to help integrate ${habit.name} into your routine!`
        addMessage(axiosJWT, user, habit, msg, userDispatch)
        alert(msg, 6000, 'info')
    }

    // else if notification frequency === 1 after ten days send alert to change event cue
    else if((createdAt > tenDays) && habit.notificationFrequency === 1) {
        const msg = `Try a different event cue to help integrate ${habit.name} into your routine!`
        addMessage(axiosJWT, user, habit, msg, userDispatch)
        alert(msg, 6000, 'info')
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

// ******************** CALL API TO ADD NOTIFICATION ********************
export const addNotification = async (days, axiosJWT, habit, user) => {
    try{
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
    catch(err) {
        console.error(err.response.data)
    }
    
}

// ******************** CALL API TO DELETE NOTIFICATION ********************
export const deleteNotification = async (axiosJWT, habit, user) => {
    try {
        const res = await axiosJWT.get(`http://localhost:5000/server/notification/${habit._id}`, {
            headers: {authorization:'Bearer ' + user.token}
        })

        let ids = []
        if(res.data) {
            res.data.forEach(n => {
                ids.push(n._id)
            })
        }

        for(const id of ids) {
            await axiosJWT.delete(`http://localhost:5000/server/notification/${id}`, {
                headers: {authorization: 'Bearer ' + user.token}
            })
        }
    } catch (err) {
        console.error(err.response.data)
    }
    
}

// ******************** CALL API TO SHOW ALERTS AND NOTIFICATIONS IN MESSAGES ********************
const addMessage = async (axiosJWT, user, habit, message, dispatch) => {
    try {
        const newMessage = {
            message: message,
            userId: user._id,
            habitId: habit._id,
            read: false
        }
        const res = await axiosJWT.put('http://localhost:5000/server/user/message/', newMessage, {
            headers: {authorization: 'Bearer ' + user.token}
        })
        console.log(res.data)
        dispatch({type: "ADD_MESSAGE", payload: res.data})  
        } catch (err) {
        console.error(err.response.data)
    }
    
}