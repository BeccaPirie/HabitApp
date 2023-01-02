import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function HabitList() {
    const [userHabits, setUserHabits] = useState([])
    const userId = "63b0873e52ab88fb84175239"

    useEffect(() => {
        const fetchUserHabits = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/server/habit/get-habits/${userId}`)
                setUserHabits(res.data)
            }
            catch(err) {
                console.error(err.response.data)
            }
        }
        fetchUserHabits()
    },[userId])
    return(
        <>
            <div>
                {userHabits.map((habit) => (
                    <Link to={`/${habit._id}`}>
                        <div key={habit._id}>{habit.name}</div>
                    </Link>
                ))}
            </div>
            <Link to={'/add'}>
                <div>+</div>
            </Link>
        </>
    )
}