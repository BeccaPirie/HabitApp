import { StyledCalendar } from "./styles/Calendar.styled"
import Calendar from "react-calendar"
import { useState, useContext } from "react"
import { UserContext } from '../context/user/UserContext'
import { useOutletContext } from "react-router-dom"
import {IconButton, Tooltip} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import ClearIcon from '@mui/icons-material/Clear';

export default function CalendarComponent({axiosJWT, habit, dispatch}) {
    const [date, setDate] = useState(new Date())
    const { user } = useContext(UserContext)
    const alert = useOutletContext()

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
                await axiosJWT.put(`https://habitbuild-api.onrender.com/server/habit/${habit._id}/remove-calendar-data`, {
                    date: dateString,
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: 'REMOVE_FROM_CALENDAR', payload: {id: habit._id, date: dateString, status: e.target.id}})

                // check if notification settings need to be updated
                const res = await axiosJWT.put(`https://habitbuild-api.onrender.com/server/notification/update`, {id:habit._id}, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                console.log(res.data)
                if(res.data.message !== undefined) alert(res.data.message, res.data.timeout, res.data.severity)
            } catch (err) {
                console.error("Couldn't update calendar")
            }
        }
        else if(dataExists) {
            try {
                await axiosJWT.put(`https://habitbuild-api.onrender.com/server/habit/${habit._id}/update-calendar-data`, {
                    date: dateString,
                    status:  e.target.id
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: 'UPDATE_CALENDAR', payload: {id: habit._id, date: dateString, status: e.target.id}})

                // check if notification settings need to be updated
                const res = await axiosJWT.put(`https://habitbuild-api.onrender.com/server/notification/update`, {id:habit._id}, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                if(res.data.message !== undefined) alert(res.data.message, res.data.timeout, res.data.severity)
            } catch (err) {
                console.error("Couldn't update calendar")
            }
        }
        else {
            try {
                await axiosJWT.put(`https://habitbuild-api.onrender.com/server/habit/${habit._id}/add-calendar-data`, {
                    date: dateString,
                    status: e.target.id
                }, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({ type: 'ADD_TO_CALENDAR', payload: {id: habit._id, date: dateString, status: e.target.id}})
                
                // check if notification settings need to be updated
                const res = await axiosJWT.put(`https://habitbuild-api.onrender.com/server/notification/update/`, {id:habit._id}, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                if(res.data.message !== undefined) alert(res.data.message, res.data.timeout, res.data.severity)
            } catch (err) {
                console.error("Couldn't update calendar")
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
                <div>{date.toDateString()}</div>
                <Tooltip title="Missed">
                    <IconButton variant="contained" id="Missed" onClick={((e) => calendarButtonClick(e))}>
                        <ClearIcon id="Missed"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Skipped">
                    <IconButton variant="contained" id="Skipped" onClick={((e) => calendarButtonClick(e))}>
                        <BlockIcon id="Skipped"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Completed">
                    <IconButton variant="contained" id="Completed" onClick={((e) => calendarButtonClick(e))}>
                        <DoneIcon id="Completed"/>
                    </IconButton>
                </Tooltip> 
            </div>
        </>
    )   
}