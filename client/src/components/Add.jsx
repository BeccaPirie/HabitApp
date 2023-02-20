import { useRef, useContext, useState } from "react"
import axios from "axios"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import { useNavigate } from "react-router-dom"
import { checkboxes } from "../checkboxes"
import { UserContext } from "../context/user/UserContext"

export default function Add() {
    const name = useRef()
    const cue = useRef()
    const actions = useRef()
    const intentions = useRef()
    const { dispatch } = useContext(HabitContext)
    const navigate = useNavigate()
    const [daysToComplete, setDaysToComplete] = useState(checkboxes)
    const { user } = useContext(UserContext)

    const submitFunction = async(e) => {
        e.preventDefault()

        const newHabit = {
            userId: user._id,
            name: name.current.value,
            eventCues: cue.current.value,
            daysToComplete: daysToComplete,
            calendarData: [],
            notificationFrequency: 1,
            daysCompleted: 0,
            daysMissed: 0,
            journal: "",
            preventingActions: actions.current.value,
            intentions: intentions.current.value,
            habitCompleted: false
        }

        try {
            const res = await axios.post("http://localhost:5000/server/habit/add", newHabit)
            dispatch({type: "ADD_HABIT", payload: res.data})
            navigate(`/${res.data._id}`)
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const onChangeFunction = (dayOfWeek) => {
        const updateToComplete = checkboxes.map((day) => 
            day.dayOfWeek === dayOfWeek ? {...day, toComplete: !day.toComplete} : {...day, toComplete: day.toComplete}
        )
        setDaysToComplete(updateToComplete)
    }

    return(
        <Form onSubmit={submitFunction}>
            <label htmlFor="habitName">Habit Name</label>
            <input
                id="habitName"
                type="text"
                ref={name}
                required />

            <label htmlFor="eventCues">Event-based cue</label>
            <TextareaAutosize
                id="eventCues"
                rows={5}
                ref={cue}
                required />
                
            <p>Select days of the week to complete the habit</p>
            <ul>
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

            <label htmlFor="preventingActions">What actions or thoughts may prevent you for carrying out this habit?</label>
            <TextareaAutosize
                id="preventingActions"
                rows={10}
                ref={actions}
                required />

            <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
            <TextareaAutosize
                id="intention"
                rows={10}
                ref={intentions}
                required />

            <div>
                <button>Add habit</button>
            </div>
        </Form>
    )
}