import { useState, useEffect, useContext } from "react"
import { StyledRightbar } from "./styles/Rightbar.styled"
import { HabitContext } from "../context/habit/HabitContext"
import { Link } from "react-router-dom"
import { UserContext } from "../context/user/UserContext"
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';

export default function Rightbar({axiosJWT}) {
    const [habitsDue, setHabitsDue] = useState([])
    const { userHabits, dispatch } = useContext(HabitContext)
    const date = new Date()
    const dayOfWeek = date.toLocaleString('default', {weekday: 'long'})
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const { user } = useContext(UserContext)

    // get habits due
    useEffect(() => {
        if(userHabits) {            
            const dueHabits = userHabits.filter(habit => {
                const notComplete = !habit.habitCompleted
                const toCompleteToday = habit.daysToComplete.find(day => day.dayOfWeek === dayOfWeek && day.toComplete)
                const data = habit.calendarData.find(data => data.date === dateString)
                return notComplete && toCompleteToday && !data
            })
            setHabitsDue(dueHabits)
        }
    }, [dayOfWeek, dateString, userHabits])

    // add data for current day
    const buttonClick = async (habitId, e) => {
        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/${habitId}/add-calendar-data`, {
                date: dateString,
                status: e.target.id
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({ type: 'ADD_TO_CALENDAR', payload: {id: habitId, date: dateString, status: e.target.id}})

            // check if notification settings need to be updated
            const res = await axiosJWT.put(`http://localhost:5000/server/notification/update/`, {id:habitId}, {
                headers: {authorization:'Bearer ' + user.token}
            })
            if(res.data.message !== undefined) alert(res.data.message, res.data.timeout, res.data.severity)
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <StyledRightbar>
            <Paper className="paper">
            <div>Have you completed these habits today?</div>
            <div>
                {habitsDue ?
                 habitsDue.map((habit) => (
                    <div className="item" key={habit._id}>
                        <Link to={`/${habit._id}`}>
                            <span className="name">{habit.name}</span>
                        </Link>
                        <div className="btn-div">
                            <Tooltip title="Missed">
                                <IconButton id="Missed" onClick={((e) => buttonClick(habit._id, e))}>
                                    <ClearIcon id="Missed"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Skipped">
                               <IconButton id="Skipped" onClick={((e) => buttonClick(habit._id, e))}>
                                    <BlockIcon id="Skipped"/>
                                </IconButton> 
                            </Tooltip>
                            <Tooltip title="Completed">
                                <IconButton id="Completed" onClick={((e) => buttonClick(habit._id, e))}>
                                    <DoneIcon id="Completed"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                ))
                : <div>No habits due today</div>}
            </div>
            </Paper>
        </StyledRightbar>
    )
}