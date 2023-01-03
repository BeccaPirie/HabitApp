import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { StyledSidebar } from "./styles/Sidebar.styled"

export default function Sidebar() {
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
            <StyledSidebar>
                <ul>
                    {userHabits.map((habit) => (
                        <Link key={habit._id} to={`/${habit._id}`}>
                            <li className="habitListItem"> 
                                <div>{habit.name}</div>
                            </li>
                        </Link>
                    ))}
                </ul>

                <Link to={'/add'}>
                    <div>+</div>
                </Link>
            </StyledSidebar>
    )
}