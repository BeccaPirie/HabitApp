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
        case "ADD_HABIT":
            return {
                ...state,
                userHabits: [...state.userHabits, action.payload]
            }
        case "UPDATE_HABIT":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload._id ? 
                    action.payload
                : habit)    
            }
        case "DELETE_HABIT":
            return {
                ...state,
                userHabits: state.userHabits.filter(habit => habit._id !== action.payload)
            }
        case "COMPLETE_HABIT":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload.id ? {
                    ...habit, habitCompleted: action.payload.complete
                } : habit)
            }
        case "UPDATE_JOURNAL":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload.id ? {
                    ...habit, journal: action.payload.journal
                }: habit)
            }
        case "UPDATE_CALENDAR":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload.id ? {
                    ...habit, calendarData: [{
                        ...habit.calendarData.map(data => data.date === action.payload.date ? {
                            ...data, status: action.payload.status
                        } : data)
                    }]
                } : habit)
            }
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
        case "REMOVE_FROM_CALENDAR":
            return {
                ...state,
                userHabits: state.userHabits.map(habit => habit._id === action.payload.id ? {
                    ...habit, calendarData: habit.calendarData.filter(data => data.date !== action.payload.date)
                } : habit)
            }
        default:
            return state
    }
}

export default HabitReducer