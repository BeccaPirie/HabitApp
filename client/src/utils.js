const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// create days array function as firebase requires array 0-6 for Sun-Mon
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