import { useState, useEffect } from "react"
import axios from "axios"

export default function Habit({habitId}) {
    const [habit, setHabit] = useState({})

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
    return(
        <div>
            <button>{habit.habitCompleted ? "Mark habit as incomplete" : "Mark habit as complete"}</button>

            <div>{habit.name}</div>
        
            <button>Edit</button>
        </div>
    )
}