import Calendar from "react-calendar"
import { StyledCalendar } from "./styles/Calendar.styled"
import { useState } from "react"

export default function HabitCalendar() {
    const [date, setDate] = useState(new Date())
    return(
        <StyledCalendar>
            <Calendar onChange={setDate} value={date}/>
        </StyledCalendar>
    )
}