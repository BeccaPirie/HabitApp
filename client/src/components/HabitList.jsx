import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { StyledHabitList } from "./styles/HabitList.styled"

export default function HabitList() {
    // if habitId is not empty, return that habit
    // if user has no habits return <ClickToAdd />
    // if user has habits, return list   

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
        <StyledHabitList>
            <Link to={'/add'}>
                <div>
                    <span>+</span>
                </div>
            </Link>
            <h3>Your habits</h3>
            <ul>            
                {userHabits.map((habit) => (
                    <Link key={habit._id} to={`/${habit._id}`}>
                        <li className="habitListItem"> 
                            <span>{habit.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </StyledHabitList>
    )
}