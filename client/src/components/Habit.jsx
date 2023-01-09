import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Calendar from "react-calendar"
import { StyledCalendar } from "./styles/Calendar.styled"
import { useParams } from "react-router-dom"
import { StyledHabit } from "./styles/Habit.styled"
import TextareaAutosize from "react-autosize-textarea"

export default function Habit() {
    const [habit, setHabit] = useState({})
    const [date, setDate] = useState(new Date())
    const habitId = useParams().id

    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const disableFutureDates = ({date, view}) => {
        if (view === "month") {
            return date > new Date()
        }
    }

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res =  await axios.get(`http://localhost:5000/server/habit/${habitId}`)            
                setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            }
        }
        fetchHabit()
    }, [habitId])

    const calendarButtonClick = async (e) => {
        try {
            await axios.put(`http://localhost:5000/server/habit/${habitId}/calendar`, {
                date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                status: e.target.id
            })
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <StyledHabit>

            <div className="habit-top">
                <h2>{habit.name}</h2> 
                <button>{habit.habitCompleted ?"Mark habit as incomplete" :
                "Mark habit as complete"}</button>  
            </div>

            <StyledCalendar>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileDisabled={disableFutureDates}/>
            </StyledCalendar>

            <div className="calendar-btns">
                <button id="Missed" onClick={((e) => calendarButtonClick(e))}>Missed</button>
                <button id="Skipped" onClick={((e) => calendarButtonClick(e))}>Skipped</button>
                <button id="Completed" onClick={((e) => calendarButtonClick(e))}>Completed</button>
            </div>

            <form>
               <label htmlFor="journal">
                    {`Journal entry for ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
                </label>
                <TextareaAutosize
                    id="journal"
                    rows={15}
                /> 
            </form>

            {/* chart */}
            
            <Link to={`/${habitId}/details`}>
               <button className="details-btn">Details</button> 
            </Link>
            
        </StyledHabit>
    )
}