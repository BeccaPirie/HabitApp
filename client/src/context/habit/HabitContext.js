import { createContext, useReducer } from 'react'
import HabitReducer from './HabitReducer'

const INITIAL_STATE = {
    userHabits: [],
    isFetching: false,
    error: false
}

export const HabitContext = createContext(INITIAL_STATE)

export const HabitContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(HabitReducer, INITIAL_STATE)

    return(
        <HabitContext.Provider
            value={{
                userHabits:state.userHabits,
                isFetching:state.isFetching,
                error:state.error,
                dispatch
            }}>
                {children}
        </HabitContext.Provider>
    )
}