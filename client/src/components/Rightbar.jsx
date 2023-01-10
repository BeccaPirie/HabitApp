import { useState, useEffect } from "react"
import axios from "axios"
import { StyledRightbar } from "./styles/Rightbar.styled"

export default function Rightbar() {
    const [habitsDue, setHabitsDue] = useState([])
    const userId = "63b0873e52ab88fb84175239"
    const date = new Date()

    const dayOfWeek = date.toLocaleString(
        'default', {weekday: 'long'}
    )

    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    useEffect(() => {
        const fetchHabitsDue = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/server/habit/due-habits/${userId}/${dayOfWeek}`)
                setHabitsDue(res.data)
            }
            catch(err) {
                console.error(err.response.data)
            }
        }
        fetchHabitsDue()
    },[userId, dayOfWeek])

    const buttonClick = async (habitId, e) => {
        try {
            await axios.put(`http://localhost:5000/server/habit/${habitId}/calendar`, {
                date: dateString,
                status: e.target.id
            })
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <StyledRightbar>
            <div>Have you completed these habits today?</div>
            <div>
                {habitsDue.length > 0 ?
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