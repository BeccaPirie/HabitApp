import { useState, useEffect, useContext } from "react"
import { StyledRightbar } from "./styles/Rightbar.styled"
import { HabitContext } from "../context/habit/HabitContext"
import { Link } from "react-router-dom"
import { UserContext } from "../context/user/UserContext"
import { notificationSettings } from "../notifications"

export default function Rightbar({axiosJWT}) {
    const [habitsDue, setHabitsDue] = useState([])
    const { userHabits, dispatch } = useContext(HabitContext)
    const date = new Date()
    const dayOfWeek = date.toLocaleString('default', {weekday: 'long'})
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const { user, dispatch:userDispatch } = useContext(UserContext)

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
            const res = await axiosJWT.put(`http://localhost:5000/server/habit/${habitId}/add-calendar-data`, {
                date: dateString,
                status: e.target.id
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({ type: 'ADD_TO_CALENDAR', payload: {id: habitId, date: dateString, status: e.target.id}})
            notificationSettings(res.data, dispatch, axiosJWT, user, userDispatch, alert)
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <StyledRightbar>
            <div>Have you completed these habits today?</div>
            <div>
                {habitsDue ?
                 habitsDue.map((habit) => (
                    <div className="item" key={habit._id}>
                        <Link to={`/${habit._id}`}>
                            <span className="name">{habit.name}</span>
                        </Link>
                        <div className="btn-div">
                            <button id="Completed" onClick={((e) => buttonClick(habit._id, e))}>Yes</button>
                            <button id="Skipped" onClick={((e) => buttonClick(habit._id, e))}>Skip</button>
                            <button id="Missed" onClick={((e) => buttonClick(habit._id, e))}>No</button>
                        </div>
                    </div>
                ))
                : <div>No habits due today</div>}
            </div>
        </StyledRightbar>
    )
}