import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import { Alert } from "./styles/Alert.styled"

export default function Details() {
    const habitId = useParams().id
    const [habit, setHabit] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const { dispatch } = useContext(HabitContext)
    const userId = "63b0873e52ab88fb84175239"
    const navigate = useNavigate()

    // get habit
    useEffect(() => {
        const fetchHabit = async() => {
            try {
               const res = await axios.get(`http://localhost:5000/server/habit/get-habit/${userId}/${habitId}`)
                setHabit(res.data)
            } catch (err) {
            console.error(err.response.data)
            } 
        }
        fetchHabit()
    }, [habitId])

    // form submit
    const onSubmitClick = async(e) => {
        e.preventDefault()

        try {
            await axios.put(`http://localhost:5000/server/habit/update/${habit._id}`, habit)
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
        console.log(updateToComplete)
        setHabit({...habit, daysToComplete: updateToComplete})
    }

    const deleteHabit = async() => {
        await axios.delete(`http://localhost:5000/server/habit/delete/${habitId}`, habitId)
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