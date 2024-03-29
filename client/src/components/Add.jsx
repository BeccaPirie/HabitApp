import { useContext, useState, useEffect } from "react"
import { Form } from "./styles/Form.styled"
import { HabitContext } from "../context/habit/HabitContext"
import { useNavigate, useOutletContext } from "react-router-dom"
import { checkboxes } from "../checkboxes"
import { UserContext } from "../context/user/UserContext"
import { Ideas } from "./styles/Ideas.styled"
import axios from "axios"
import { Button, TextField, InputAdornment, Paper, List, ListItem,
    ListItemText, MenuItem, FormControl, Select, Grid } from '@mui/material'

export default function Add({axiosJWT}) {
    const [habit, setHabit] = useState({})
    const { dispatch } = useContext(HabitContext)
    const navigate = useNavigate()
    const [daysToComplete, setDaysToComplete] = useState(checkboxes)
    const { user } = useContext(UserContext)
    const [showIdeas, setShowIdeas] = useState(false)
    const [ideas, setIdeas] = useState({})
    const alert = useOutletContext()

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const res = await axios.get('https://habitbuild-api.onrender.com/server/idea')
                setIdeas(res.data)
            } catch (err) {
                console.error(err.response.data)
            }
        }
      fetchIdeas()
    }, [])
    
    const submitFunction = async(e) => {
        e.preventDefault()

        const newHabit = {
            userId: user._id,
            name: habit.name,
            eventCues: habit.eventCues,
            daysToComplete: daysToComplete,
            calendarData: [],
            notificationFrequency: 1,
            daysCompleted: 0,
            daysMissed: 0,
            journal: "",
            preventingActions: habit.preventingActions,
            intentions: habit.intentions,
            habitCompleted: false,
            time: habit.time || "18:00",
            todos: []
        }

        try {
            // add habit
            const res = await axiosJWT.post("https://habitbuild-api.onrender.com/server/habit/add", newHabit, {
                headers: {authorization:'Bearer ' + user.token}
            })

            // add notification
            await axiosJWT.post(`https://habitbuild-api.onrender.com/server/notification/set-notification`, {
                title: res.data.name,
                body: `Have you completed ${habit.name} today?`,
                days: res.data.daysToComplete,
                time: res.data.time,
                habitId: res.data._id
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })
            console.log("notification created")
            dispatch({type: "ADD_HABIT", payload: res.data})
            navigate(`/${res.data._id}`)
            alert('Habit added', 3000, 'success')
        } catch (err) {
            alert("Error adding habit", 3000, 'error')
        }
    }

    const onChangeFunction = (dayOfWeek) => {
        const updateToComplete = daysToComplete.map((day) =>
            day.dayOfWeek === dayOfWeek ? {...day, toComplete: !day.toComplete} : {...day, toComplete: day.toComplete}
        )
        setDaysToComplete(updateToComplete)
    }

    const handleIdeaClick = (name) => {
        setHabit({...habit, name: name})
        setShowIdeas(false)
    }

    return(
        <>
            <Form onSubmit={submitFunction}>
                <Paper className="paper">
                    <Grid container direction={"column"} spacing={2} className="container">
                        <Grid item>
                            <TextField
                                id="habitName"
                                label="Habit name"
                                value={habit.name || ''}
                                onChange={(e) => setHabit({...habit, name: e.target.value})}
                                required
                                fullWidth
                                InputProps={{
                                    endAdornment:<InputAdornment position="end">
                                        <Button
                                            className="ideasBtn"
                                            onClick={()=> setShowIdeas(!showIdeas)}>
                                            Ideas
                                        </Button>
                                    </InputAdornment>
                                }} />
                        </Grid>
                    
                        {showIdeas && <Ideas>
                            <List>
                                {ideas.length > 0 && ideas.map((idea, index) => {
                                    return <ListItem
                                            key={index}
                                            className="ideaItem"
                                            onClick={() => handleIdeaClick(idea.name)}>
                                                <ListItemText primary={idea.name}/>
                                            </ListItem>
                                })}
                            </List>
                        </Ideas>}

                        <Grid item>
                            <label htmlFor="eventCues">When do you want to carry out the habit? (Eg. after breakfast)</label>
                            <TextField
                                id="eventCues"
                                multiline
                                fullWidth
                                minRows={5}
                                value={habit.eventCues || ''}
                                onChange={(e) => setHabit({...habit, eventCues: e.target.value})}
                                required />
                        </Grid>
                            
                        <Grid item>
                            <p>Select the days of the week you want to complete this habit</p>
                            <ul className="daysOfWeek">
                                {daysToComplete.map(({dayOfWeek, toComplete}) => {
                                    return(
                                        <li key={dayOfWeek}>
                                            <input 
                                                type="checkbox"
                                                className="formCheckbox"
                                                id={dayOfWeek}
                                                name={dayOfWeek}
                                                value={dayOfWeek}
                                                checked={toComplete}
                                                onChange={() => onChangeFunction(dayOfWeek)}
                                            />
                                            <label htmlFor={dayOfWeek}>{dayOfWeek}</label>
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
                                required />
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
                                required />
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

                        <div>
                            <Button type="submit" variant="contained" id="add-btn">Add habit</Button>
                        </div>
                    </Grid>
                </Paper>
            </Form>
        </>
    )
}