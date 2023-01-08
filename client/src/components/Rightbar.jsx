import { useState, useEffect } from "react"
import axios from "axios"
import { StyledRightbar } from "./styles/Rightbar.styled"

export default function Rightbar() {
    const [habitsDue, setHabitsDue] = useState({})
    const userId = "63b0873e52ab88fb84175239"

    const dayOfWeek = new Date().toLocaleString(
        'default', {weekday: 'long'}
    )

    useEffect(() => {
        const fetchUserHabits = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/server/habit/due-habits/${userId}/${dayOfWeek}`)
                setHabitsDue(res.data)
            }
            catch(err) {
                console.error(err.response.data)
            }
        }
        fetchUserHabits()
    },[userId])

    return(
        <StyledRightbar>
            <div>Have you completed these habits today?</div>
            <div>
                {Object.keys(habitsDue).length > 0 ?
                 habitsDue.map((habit) => {
                    <div>
                        {habit.name}
                    </div>
                }) : <div>No habits due today </div>}
            </div>
        </StyledRightbar>
    )
}