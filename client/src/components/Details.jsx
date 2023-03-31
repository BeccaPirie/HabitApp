import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { Form } from "./styles/Form.styled"
import { HabitContext } from "../context/habit/HabitContext"
import { UserContext } from "../context/user/UserContext"
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Paper, Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, MenuItem,
    FormControl, Select, Grid } from "@mui/material"

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
               const res = await axiosJWT.get(`https://habitbuild-api.onrender.com/server/habit/get-habit/${habitId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
               setHabit(res.data)
            } catch (err) {
                console.error("Couldn't fetch habit")
            } 
        }
        fetchHabit()
    }, [user._id, habitId, axiosJWT, user.token])

    // form submit
    const onSubmitClick = async(e) => {
        e.preventDefault()

        try {
            await axiosJWT.put(`https://habitbuild-api.onrender.com/server/habit/update/${habit._id}`, habit, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: "UPDATE_HABIT", payload: habit})
            
            // delete notifications
            await axiosJWT.delete(`https://habitbuild-api.onrender.com/server/notification/${habit._id}`, {
                headers: {authorization:'Bearer ' + user.token}
            }) 

            // create new notification
            await axiosJWT.post(`https://habitbuild-api.onrender.com/server/notification/set-notification`, {
                title: habit.name,
                body: `Have you completed ${habit.name} today?`,
                days: habit.daysToComplete,
                time: habit.time,
                habitId: habit._id
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })

            navigate(`/${habit._id}`)
            alert("Habit updated", 3000, 'success')
        } catch (err) {
            console.error("Couldn't update habit")
        }
    }

    const updateDaysToComplete = (dayOfWeek) => {
        const updateToComplete = habit.daysToComplete.map((day) => 
            day.dayOfWeek === dayOfWeek ? {...day, toComplete: !day.toComplete} : {...day, toComplete: day.toComplete}
        )
        setHabit({...habit, daysToComplete: updateToComplete})
    }

    const deleteHabit = async() => {
        // delete habit
        await axiosJWT.delete(`https://habitbuild-api.onrender.com/server/habit/delete/${habitId}`, {
            headers: {authorization:'Bearer ' + user.token}
        })
        dispatch({type: "DELETE_HABIT", payload: habitId})
        navigate('/')
        alert("Habit deleted", 3000, 'success')
        // delete notification associated with habit
        await axiosJWT.delete(`https://habitbuild-api.onrender.com/server/notification/${habitId}`, {
            headers: {authorization:'Bearer ' + user.token}
        })
    }

    return(
        <Form onSubmit={onSubmitClick}>
            <Paper className="paper">
                <Grid container direction={"column"} spacing={2} className="container">
                    <Grid item>
                        <TextField
                            id="edit-name"
                            label="Habit name"
                            value={habit.name || ''}
                            onChange={(e) => setHabit({...habit, name: e.target.value})}
                            required
                            fullWidth
                            error={habit.name === ""} />
                    </Grid>

                    <Grid item>
                        <label htmlFor="eventCues">When do you want to carry out the habit? (Eg. after breakfast)</label>
                        <TextField
                            id="eventCues"
                            multiline
                            fullWidth
                            minRows={5}
                            value={habit.eventCues || ''}
                            onChange={(e) => setHabit({...habit, eventCues: e.target.value})}
                            required
                            error={habit.eventCues === ''}/>
                    </Grid>

                    <Grid item>
                        <p>Select the days of the week you want to complete this habit</p>
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
                    </Grid>

                    <Grid item>
                        <label htmlFor="preventingActions">What actions or thoughts may prevent you for carrying out this habit?</label>
                        <TextField
                            id="preventingActions"
                            minRows={5}
                            multiline
                            fullWidth
                            value={habit.preventingActions || ''}
                            onChange={(e) => setHabit({...habit, preventingActions: e.target.value})}
                            required
                            error={habit.preventingActions === ''}/>
                    </Grid>

                    <Grid item>
                        <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
                        <TextField
                            id="intention"
                            minRows={5}
                            multiline
                            fullWidth
                            value={habit.intentions || ''}
                            onChange={(e) => setHabit({...habit, intentions: e.target.value})}
                            required
                            error={habit.intentions === ''}/>
                    </Grid>

                    <Grid item>
                        <FormControl fullWidth required>
                            <label htmlFor="notif-time-select">Select a time of day to receive reminder notifications <b>after</b> the event cue</label>
                            <Select
                                id="notif-time-select"
                                value={habit.time || "18:00"}
                                onChange={(e) => setHabit({...habit, time: e.target.value})}
                            >
                                <MenuItem value={"10:00"}>Morning</MenuItem>
                                <MenuItem value={"14:00"}>Afternoon</MenuItem>
                                <MenuItem value={"18:00"}>Evening</MenuItem>
                                <MenuItem value={"21:00"}>Night</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

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
                </Grid>
            </Paper>
        </Form>
    )
}