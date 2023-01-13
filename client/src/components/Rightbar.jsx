import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { StyledRightbar } from "./styles/Rightbar.styled"
import { HabitContext } from "../context/habit/HabitContext"

export default function Rightbar() {
    const [habitsDue, setHabitsDue] = useState([])
    const { userHabits, dispatch } = useContext(HabitContext)
    const date = new Date()
    const dayOfWeek = date.toLocaleString('default', {weekday: 'long'})
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    console.log(userHabits)

    useEffect(() => {
        if(userHabits) {
            const dueHabits = []
            for (const habit of userHabits) {
                if (habit.toComplete) continue
                for(let i = 0; i < habit.daysToComplete.length; i++) {
                    if(habit.daysToComplete[i].dayOfWeek !== dayOfWeek) continue
                    if(habit.daysToComplete[i].toComplete !== true) continue
                    const date = habit.calendarData.find(x => x.date === dateString)
                        if(!date) {
                            dueHabits.push(habit)
                    }
                }
            }
        setHabitsDue(dueHabits) 
        }
    }, [dayOfWeek, dateString, userHabits])

    // useEffect(() => {
    //     const fetchHabitsDue = async () => {
    //         try{
    //             const res = await axios.get(`http://localhost:5000/server/habit/due-habits/${userId}/${dayOfWeek}`)
    //             setHabitsDue(res.data)
    //         }
    //         catch(err) {
    //             console.error(err.response.data)
    //         }
    //     }
    //     fetchHabitsDue()
    // },[userId, dayOfWeek])

    const buttonClick = async (habitId, e) => {
        try {
            await axios.put(`http://localhost:5000/server/habit/${habitId}/add-calendar-data`, {
                date: dateString,
                status: e.target.id
            })
            dispatch({ type: 'ADD_TO_CALENDAR', payload: {id: habitId, date: dateString, status: e.target.id}})
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
                        <span className="name">
                            {habit.name}
                        </span>
                        <div className="btn-div">
                            <button id="Completed" onClick={((e) => buttonClick(habit._id, e))}>yes</button>
                            <button id="Skipped" onClick={((e) => buttonClick(habit._id, e))}>skip</button>
                            <button id="Missed" onClick={((e) => buttonClick(habit._id, e))}>no</button>
                        </div>
                    </div>
                ))
                : <div>No habits due today</div>}
            </div>
        </StyledRightbar>
    )
}