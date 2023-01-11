import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { StyledHabitList } from "./styles/HabitList.styled"

// TODO handle different viewport sizes

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
        <StyledHabitList>
            <h2 className="list-header">Habit App</h2>
            <ul>            
                {userHabits.map((habit) => (
                    <Link key={habit._id} to={`/${habit._id}`}>
                        <li className="habitListItem"> 
                            <span>{habit.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>

            <Link to={'/add'}>
                <div className="addBtn">
                    <span>+</span>
                </div>
            </Link>
        </StyledHabitList>
    )
}