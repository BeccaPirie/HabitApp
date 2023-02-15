import moment from "moment"

const days = [0, 1, 2, 3, 4]

export default function notificationSettings(habit) {
    // get dates for past 5 days
    let dates = []
    days.forEach(day => {
        const date = moment().subtract(day, 'day').format('YYYY-M-DD')
        dates.push({date: date, status: ''})
    })

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
    
    // find calendar data that matches each date
    dates.forEach(date => {
        const matchingDate = reformatData.find(data => data.date === date.date)
        if(matchingDate) return date.status = matchingDate.status
        else return date.status = "No data"
    })

    // if all days completed half the amount of notifications received (?)
    const isAllCompleted = dates.every(date => date.status === 'Completed')
    if(isAllCompleted) {
        console.log("all days completed")
    }
    
    // if 4/5 days missed/no data, ask user to change event cue (give examples) and/or change notifications to daily or double frequency (?)
    // (if notifications are already daily, just ask users to change event cue)
    let count = 0
    dates.forEach(date => {
        if(date.status === 'Missed' || date.status === 'No data') return count++
    })
    if(count >= 4) {
        console.log(`${count} days missed`)
    }

    // If __ days missed stop notifications
    const isAllMissed = dates.every(date => date.status === "Missed" || date.status === "No data")
    if(isAllMissed) {
        console.log("all days missed")
    }
    
}