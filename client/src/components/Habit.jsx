import { useState, useEffect, useContext } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledHabit } from "./styles/Habit.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import Chart from "./Chart"
import { UserContext } from '../context/user/UserContext'
import CalendarComponent from "./Calendar"
import { addNotification, createDaysArray, deleteNotification } from "../notifications"
import Todos from "./Todos"
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from "@mui/base/ClickAwayListener";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Habit({axiosJWT}) {
    const [habit, setHabit] = useState({})
    const [isComplete, setIsComplete] = useState(habit.habitCompleted)
    const [journal, setJournal] = useState(habit.journal)
    const [editTitle, setEditTitle] = useState(false)
    const [newTitle, setNewTitle] = useState(habit.name)
    const habitId = useParams().id
    const { userHabits, dispatch } = useContext(HabitContext) || []
    const { user } = useContext(UserContext)
    const alert = useOutletContext()

    // set habit
    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res =  await axiosJWT.get(`http://localhost:5000/server/habit/get-habit/${habitId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            }
        }
        fetchHabit()
    }, [user._id, habitId, userHabits, user.token, axiosJWT])

    // set title
    useEffect(() => {
        setNewTitle(habit.name)
    }, [habit, habit.name])

    // set isComplete
    useEffect(() => {
        setIsComplete(habit.habitCompleted)
    }, [habit, habit.habitCompleted])

    // set journal
    useEffect(() => {
        setJournal(habit.journal)
    }, [habit, habit.journal])

    // handle title button click
    const editTitleClick = async() => {
        try {
            const updatedHabit = {...habit, name: newTitle}
            await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, updatedHabit, {
                headers: {authorization:'Bearer ' + user.token}
            })
            // dispatch
            setEditTitle(false)
        } catch(err) {
            console.error(err.response.data)
        }
    } 

    // handle complete button click
    const completeButtonClick = async () => {
        try {
            const updatedHabit = {...habit, habitCompleted: !isComplete}
            await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, updatedHabit, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: 'COMPLETE_HABIT', payload: {id: habit._id, complete: !isComplete}})

            if(!isComplete) {
                deleteNotification(axiosJWT, habit, user)              
            }
            else {
                // start notifications
                const days = createDaysArray(habit.daysToComplete)
                addNotification(days, axiosJWT, habit, user)
            }

        } catch (err) {
            console.error(err.response.data)
        }
        setIsComplete(!isComplete)
    }

    // handle journal button click
    const journalButtonClick = async (e) => {
        e.preventDefault()
        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/journal/${habit._id}`, {
                journal: journal
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: 'UPDATE_JOURNAL', payload: {id: habit._id, journal: journal}})
            alert("Journal updated", 3000, 'success')
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <StyledHabit>
            <Paper className="paper">
                <div className="habit-top">

                    {editTitle ?
                        <div className="title-form">
                            <ClickAwayListener onClickAway={() => setEditTitle(false)}>
                                <TextField
                                    fullWidth
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <Button onClick={editTitleClick}>Save</Button>
                                            </InputAdornment>
                                    }}/>
                            </ClickAwayListener>
                        </div> :
                        <div className="title-div">
                            <h2>{habit.name}</h2>
                            <Tooltip title="Edit title">
                               <IconButton onClick={() => setEditTitle(true)}>
                                    <EditIcon/>
                                </IconButton> 
                            </Tooltip>
                        </div>}

                    <Tooltip title={isComplete ? "Mark habit as incomplete" : "Mark habit as complete"}>
                        <IconButton
                            id="habit-completed-btn"
                            onClick={completeButtonClick}>
                                {isComplete ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                        </IconButton>
                    </Tooltip>
                </div>

                <CalendarComponent 
                    axiosJWT={axiosJWT}
                    habit={habit}
                    dispatch={dispatch}
                />

                <Todos
                    habit={habit}
                    axiosJWT={axiosJWT}
                />

                <form onSubmit={(e)=> journalButtonClick(e)}>
                    <TextField
                        id="journal"
                        label="Journal Notes"
                        multiline
                        fullWidth
                        minRows={10}
                        value={journal || ''}
                        onChange={e => setJournal(e.target.value)}/>
                    <div>
                        <Button type="submit" variant="contained">Update journal</Button>
                    </div>
                </form>

                <Chart data={habit.calendarData}/>

                <Link to={`/${habitId}/details`}>
                    <Button
                        variant="contained"
                        className="details-btn">
                            Details
                    </Button> 
                </Link>
            </Paper>
        </StyledHabit>
    )
}