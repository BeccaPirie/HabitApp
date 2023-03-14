import { StyledCalendar } from "./styles/Calendar.styled"
import Calendar from "react-calendar"
import { ButtonStyled } from "./styles/Button.styled"
import { useState, useContext } from "react"
import { UserContext } from '../context/user/UserContext'
import { notificationSettings } from "../notifications"

export default function CalendarComponent({axiosJWT, habit, dispatch}) {
    const [date, setDate] = useState(new Date())
    const { user, dispatch:userDispatch } = useContext(UserContext)

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
                const res = await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/remove-calendar-data`, {
                    date: dateString,
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: 'REMOVE_FROM_CALENDAR', payload: {id: habit._id, date: dateString, status: e.target.id}})
                notificationSettings(res.data, dispatch, axiosJWT, user, userDispatch)
            } catch (err) {
                console.error(err.response.data)
            }
        }
        else if(dataExists) {
            try {
                const res = await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/update-calendar-data`, {
                    date: dateString,
                    status:  e.target.id
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: 'UPDATE_CALENDAR', payload: {id: habit._id, date: dateString, status: e.target.id}})
                notificationSettings(res.data, dispatch, axiosJWT, user, userDispatch)
            } catch (err) {
                console.error(err.response.data)
            }
        }
        else {
            try {
                const res = await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/add-calendar-data`, {
                    date: dateString,
                    status: e.target.id
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: 'ADD_TO_CALENDAR', payload: {id: habit._id, date: dateString, status: e.target.id}})
                notificationSettings(res.data, dispatch, axiosJWT, user, userDispatch)
            } catch (err) {
                console.error(err.response.data)
            }
        }
    }

    return(
        <>
            <StyledCalendar>
            <Calendar
                onChange={setDate}
                value={date}
                tileDisabled={disableFutureDates}
                tileClassName={tileClassName}/>
            </StyledCalendar>

            <div className="calendar-btns">
                <ButtonStyled id="Missed" onClick={((e) => calendarButtonClick(e))}>Missed</ButtonStyled>
                <ButtonStyled id="Skipped" onClick={((e) => calendarButtonClick(e))}>Skipped</ButtonStyled>
                <ButtonStyled id="Completed" onClick={((e) => calendarButtonClick(e))}>Completed</ButtonStyled>
            </div>
        </>
    )   
}