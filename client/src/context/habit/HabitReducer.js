const HabitReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return {
                userHabits: null,
                isFetching: true,
                error: false
            }
        case "FETCH_HABITS":
            return {
                userHabits: action.payload,
                isFetching: false,
                error: false
            }
        case "FETCH_FAIL":
            return {
                userHabits: null,
                isFetching: false,
                error: true
            }
        case "UPDATE_CALENDAR":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload.id ? {
                    ...habit, calendarData: [...habit.calendarData, {
                        ...habit.calendarData.map(data => data.date === action.payload.date ? {
                            ...data.date, status: action.payload.status
                        } : data)
                    }]
                } : habit)
            }
        // TODO FIX
        case "ADD_TO_CALENDAR":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload.id ? {
                    ...habit, calendarData: [...habit.calendarData, {
                        date: action.payload.date,
                        status: action.payload.status
                    }]                   
                } : habit)
            }
        // TODO FIX
        case "REMOVE_FROM_CALENDAR":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit.id === action.payload.id ? {
                    ...habit, calendarData: [habit.calendarData.filter(data => data.date !== action.payload.date)]
                } : habit)
            }
        default:
            return state
    }
}

export default HabitReducer