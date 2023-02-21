import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import { Alert } from "./styles/Alert.styled"
import { UserContext } from "../context/user/UserContext"

export default function Details({axiosJWT}) {
    const habitId = useParams().id
    const [habit, setHabit] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const { dispatch } = useContext(HabitContext)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    // get habit
    useEffect(() => {
        const fetchHabit = async() => {
            try {
               const res = await axiosJWT.get(`http://localhost:5000/server/habit/get-habit/${habitId}`, {
                headers: {authorization:'Bearer ' + user.token}
            })
               console.log(res.data) 
               setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            } 
        }
        fetchHabit()
    }, [user._id, habitId])

    // form submit
    const onSubmitClick = async(e) => {
        e.preventDefault()

        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, {
                headers: {authorization:'Bearer ' + user.token},
                body: habit
            })
            dispatch({type: "UPDATE_HABIT", payload: habit})
            alert()
        } catch (err) {
            console.error(err.response.data)
        }
    }

    // handle alert display
    const alert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }

    const updateDaysToComplete = (dayOfWeek) => {
        const updateToComplete = habit.daysToComplete.map((day) => 
            day.dayOfWeek === dayOfWeek ? {...day, toComplete: !day.toComplete} : {...day, toComplete: day.toComplete}
        )
        setHabit({...habit, daysToComplete: updateToComplete})
    }

    const deleteHabit = async() => {
        await axiosJWT.delete(`http://localhost:5000/server/habit/delete/${habitId}`, habitId)
        dispatch({type: "DELETE_HABIT", payload: habitId})
        navigate('/')
    }

    return(
        <>
            {showAlert && <Alert>Habit updated</Alert>}
            <Form onSubmit={onSubmitClick}>
                <label htmlFor="habitName">Habit Name</label>
                <input
                    id="habitName"
                    type="text"
                    value={habit.name || ''}
                    onChange={(e) => setHabit({...habit, name: e.target.value})}
                    required>
                </input>

                <label htmlFor="eventCues">Event-based cue</label>
                <TextareaAutosize
                    id="eventCues"
                    rows={5}
                    value={habit.eventCues || ''}
                    onChange={(e) => setHabit({...habit, eventCues: e.target.value})}
                    required />

                <p>Select days of the week to complete the habit</p>
                <ul>
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
                <TextareaAutosize
                    id="preventingActions"
                    rows={10}
                    value={habit.preventingActions || ''}
                    onChange={(e) => setHabit({...habit, preventingActions: e.target.value})}
                    required />

                <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
                <TextareaAutosize
                    id="intention"
                    rows={10}
                    value={habit.intentions || ''}
                    onChange={(e) => setHabit({...habit, intentions: e.target.value})}
                    required />

                <div>
                    <button>Save</button>
                </div>              
            </Form>
            <button style={{float:"right"}} onClick={deleteHabit}>Delete Habit</button>
        </> 
    )
}