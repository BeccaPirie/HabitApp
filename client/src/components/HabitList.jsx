import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { StyledHabitList } from "./styles/HabitList.styled"
import { HabitContext } from "../context/habit/HabitContext"

// TODO handle different viewport sizes

export default function HabitList() {
    const { userHabits } = useContext(HabitContext)
    const [sortedHabits, setSortedHabits] = useState([])

    // sort habits
    useEffect(() => {
        if(userHabits) {
        const uncompleted = userHabits.filter(habit => habit.habitCompleted === false)
        const completed = userHabits.filter(habit => habit.habitCompleted === true)
        setSortedHabits(uncompleted.concat(completed))
        }
    }, [userHabits])

    return(
        <StyledHabitList>
            <Link to={'/'}>
                <h2 className="list-header">Habit App</h2>
            </Link>
            <ul>            
                {sortedHabits.length > 0 && sortedHabits.map((habit) => (
                    <Link key={habit._id} to={`/${habit._id}`}>
                        <li className={`habitListItem-${habit.habitCompleted}`}>
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