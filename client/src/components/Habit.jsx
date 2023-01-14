import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Calendar from "react-calendar"
import { StyledCalendar } from "./styles/Calendar.styled"
import { useParams } from "react-router-dom"
import { StyledHabit } from "./styles/Habit.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"

export default function Habit() {
    const [habit, setHabit] = useState({})
    const [isComplete, setIsComplete] = useState(habit.habitCompleted)
    const [journal, setJournal] = useState(habit.journal)
    const [date, setDate] = useState(new Date())
    const habitId = useParams().id
    const { userHabits, dispatch } = useContext(HabitContext)
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const userId = "63b0873e52ab88fb84175239"

    // set habit
    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res =  await axios.get(`http://localhost:5000/server/habit/get-habit/${userId}/${habitId}`)            
                setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            }
        }
        fetchHabit()
    }, [userId, habitId, userHabits])

    // set isComplete
    useEffect(() => {
        setIsComplete(habit.habitCompleted)
    }, [habit, habit.habitCompleted])

    useEffect(() => {
        setJournal(habit.journal)
    }, [habit, habit.journal])

    // disable future dates on calendar
    const disableFutureDates = ({date, view}) => {
        if (view === "month") {
            return date > new Date()
        }
    }

    // style calendar tiles based on habit data
    const tileClassName = ({date, view}) => {
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        if(Object.keys(habit).length > 0 && view === "month") {
            const dateData = habit.calendarData.find(data => data.date === dateString)
            if(dateData !== undefined) return dateData.status
        }
    }

    // handle calendar button click
    const calendarButtonClick = async (e) => {
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const dataMatches = habit.calendarData.find(data => data.date === dateString && data.status === e.target.id)
        const dataExists = habit.calendarData.find(data => data.date === dateString)
        if(dataMatches) {
            try {
                await axios.put(`http://localhost:5000/server/habit/${habitId}/remove-calendar-data`, {
                    date: dateString,
                })
                dispatch({ type: 'REMOVE_FROM_CALENDAR', payload: {id: habitId, date: dateString, status: e.target.id}})
            } catch (err) {
                console.error(err.response.data)
            }
        }
        else if(dataExists) {
            try {
                await axios.put(`http://localhost:5000/server/habit/${habitId}/update-calendar-data`, {
                    date: dateString,
                    status:  e.target.id
                })
                dispatch({ type: 'UPDATE_CALENDAR', payload: {id: habitId, date: dateString, status: e.target.id}})
            } catch (err) {
                console.error(err.response.data)
            }
        }
        else {
            try {
                await axios.put(`http://localhost:5000/server/habit/${habitId}/add-calendar-data`, {
                    date: dateString,
                    status: e.target.id
                })
                dispatch({ type: 'ADD_TO_CALENDAR', payload: {id: habitId, date: dateString, status: e.target.id}})
            } catch (err) {
                console.error(err.response.data)
            }
        }
    }

    // handle complete button click
    const completeButtonClick = async () => {
        try {
            // const updatedHabit = {...habit, habitCompleted: !isComplete}
            await axios.put(`http://localhost:5000/server/habit/complete/${habit._id}`, {complete:!isComplete})
            dispatch({type: 'COMPLETE_HABIT', payload: {id: habit._id, complete: !isComplete}})
        } catch (err) {
            console.error(err.response.data)
        }
        setIsComplete(!isComplete)
    }

    // handle journal button click
    const journalButtonClick = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/server/habit/journal/${habit._id}`, {
                journal: journal
            })
            dispatch({type: 'UPDATE_JOURNAL', payload: {id:habit._id, journal: journal}})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <StyledHabit>

            <div className="habit-top">
                <h2>{habit.name}</h2> 
                <button onClick={completeButtonClick}>
                    {isComplete ? "Mark habit as incomplete" : "Mark habit as complete"}
                </button>  
            </div>

            <StyledCalendar>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileDisabled={disableFutureDates}
                    tileClassName={tileClassName}/>
            </StyledCalendar>

            <div className="calendar-btns">
                <button id="Missed" onClick={((e) => calendarButtonClick(e))}>Missed</button>
                <button id="Skipped" onClick={((e) => calendarButtonClick(e))}>Skipped</button>
                <button id="Completed" onClick={((e) => calendarButtonClick(e))}>Completed</button>
            </div>

            <form onSubmit={(e)=> journalButtonClick(e)}>
               <label htmlFor="journal">
                    {`Journal entry for ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
                </label>
                <TextareaAutosize
                    id="journal"
                    rows={15}
                    value={journal || ''}
                    onChange={e => setJournal(e.target.value)}
                />
                <div>
                    <button>Save</button>
                </div>
            </form>

            {/* chart */}
            
            <Link to={`/${habitId}/details`}>
               <button className="details-btn">Details</button> 
            </Link>
            
        </StyledHabit>
    )
}