import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import { UserContext } from "../context/user/UserContext"
import { ButtonStyled } from "./styles/Button.styled"
import { addNotification, createDaysArray, deleteNotification } from "../notifications"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Paper } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Details({axiosJWT}) {
    const habitId = useParams().id
    const [habit, setHabit] = useState({})
    const { dispatch } = useContext(HabitContext)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const alert = useOutletContext()
    const [openAlert, setOpenAlert] = useState(false)

    // get habit
    useEffect(() => {
        const fetchHabit = async() => {
            try {
               const res = await axiosJWT.get(`http://localhost:5000/server/habit/get-habit/${habitId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
               setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            } 
        }
        fetchHabit()
    }, [user._id, habitId, axiosJWT, user.token])

    // form submit
    const onSubmitClick = async(e) => {
        e.preventDefault()

        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, habit, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: "UPDATE_HABIT", payload: habit})
            
            // delete current notification
            deleteNotification(axiosJWT, habit, user)
            // create new notification
            console.log(habit)
            const days = createDaysArray(habit.daysToComplete)
            addNotification(days, axiosJWT, habit, user)

            navigate(`/${habit._id}`)
            alert("Habit updated", 3000, 'success')
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const updateDaysToComplete = (dayOfWeek) => {
        const updateToComplete = habit.daysToComplete.map((day) => 
            day.dayOfWeek === dayOfWeek ? {...day, toComplete: !day.toComplete} : {...day, toComplete: day.toComplete}
        )
        setHabit({...habit, daysToComplete: updateToComplete})
    }

    const deleteHabit = async() => {
        await axiosJWT.delete(`http://localhost:5000/server/habit/delete/${habitId}`, {
            headers: {authorization:'Bearer ' + user.token}
        })
        dispatch({type: "DELETE_HABIT", payload: habitId})
        navigate('/')
        alert("Habit deleted", 3000, 'success')
        deleteNotification(axiosJWT, habit, user)
    }

    return(
        <Form onSubmit={onSubmitClick}>
            <Paper className="paper">
                {/* <label htmlFor="habitName">Habit Name</label> */}
                <TextField
                    id="edit-name"
                    label="Habit name"
                    value={habit.name || ''}
                    onChange={(e) => setHabit({...habit, name: e.target.value})}
                    required
                    fullWidth
                    error={habit.name === ""} />

                <label htmlFor="eventCues">Event-based cue</label>
                <TextField
                    id="eventCues"
                    multiline
                    fullWidth
                    minRows={5}
                    value={habit.eventCues || ''}
                    onChange={(e) => setHabit({...habit, eventCues: e.target.value})}
                    required
                    error={habit.eventCues === ''}/>

                <p>Select days of the week to complete the habit</p>
                <ul className="daysOfWeek">
                    {habit.daysToComplete && habit.daysToComplete.map(({dayOfWeek, toComplete}) => {
                        return(
                            <li key={dayOfWeek}>
                                <input
                                    type="checkbox"
                                    className="formCheckbox"
                                    id={dayOfWeek}
                                    name={dayOfWeek}
                                    value={dayOfWeek}
                                    checked={toComplete}
                                    onChange={() => updateDaysToComplete(dayOfWeek)}
                                />
                                <label htmlFor={`${dayOfWeek}`}>{dayOfWeek}</label>
                            </li>
                        )
                    })}
                </ul>

                <label htmlFor="preventingActions">What actions or thoughts may prevent you for carrying out this habit?</label>
                <TextField
                    id="preventingActions"
                    minRows={10}
                    multiline
                    fullWidth
                    value={habit.preventingActions || ''}
                    onChange={(e) => setHabit({...habit, preventingActions: e.target.value})}
                    required
                    error={habit.preventingActions === ''}/>

                <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
                <TextField
                    id="intention"
                    minRows={10}
                    multiline
                    fullWidth
                    value={habit.intentions || ''}
                    onChange={(e) => setHabit({...habit, intentions: e.target.value})}
                    required
                    error={habit.intentions === ''}/>

                <div className="submit-div">
                    <Button
                        variant="contained"
                        type="submit"
                        id="save-btn">
                            Save
                    </Button>
                </div>    
                <div>         
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon/>}
                        type="button"
                        id="delete-btn"
                        onClick={() => setOpenAlert(true)}>
                            Delete Habit
                    </Button>

                    <Dialog
                        open={openAlert}
                        onClose={() => setOpenAlert(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {`Are you sure you want to delete ${habit.name}?`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This action can't be undone
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenAlert(false)}>No</Button>
                            <Button onClick={deleteHabit} autoFocus>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </div> 
            </Paper>
        </Form>
    )
}