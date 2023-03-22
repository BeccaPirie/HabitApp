import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { StyledHabitList } from "./styles/HabitList.styled"
import { HabitContext } from "../context/habit/HabitContext"
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function HabitList() {
    const { userHabits } = useContext(HabitContext)
    const [sortedHabits, setSortedHabits] = useState([])

    // sort habits
    useEffect(() => {
        if(userHabits) {
        const uncompleted = userHabits.filter(habit => !habit.habitCompleted)
        const completed = userHabits.filter(habit => habit.habitCompleted)
        setSortedHabits(uncompleted.concat(completed))
        }
    }, [userHabits])

    return(
        <StyledHabitList>
            <Link to={'/'}>
                <h2 className="list-header">HabitBuild</h2>
            </Link>

            <List>
                <Divider/>
            {sortedHabits.length > 0 && sortedHabits.map((habit) => (
                <Link key={habit._id} to={`/${habit._id}`}>
                    <ListItem className={`habitListItem-${habit.habitCompleted}`}>
                        <ListItemText primary={habit.name}/>
                    </ListItem>
                    <Divider/>
                </Link>
            ))}
            </List>

            <Link to={'/add'}>
                    <Fab aria-label="add" className="addBtn">
                        <AddIcon />
                    </Fab>                
            </Link>

        </StyledHabitList>
    )
}