import { Link } from "react-router-dom"
import { useContext } from "react"
import { StyledHabitList } from "./styles/HabitList.styled"
import { HabitContext } from "../context/habit/HabitContext"

// TODO handle different viewport sizes

export default function HabitList() {
    const { userHabits } = useContext(HabitContext)
    return(
        <StyledHabitList>
            <h2 className="list-header">Habit App</h2>
            <ul>            
                {userHabits && userHabits.map((habit) => (
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