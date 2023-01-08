import { useRef } from "react"
import axios from "axios"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"

export default function Add() {
    const userId = '63b0873e52ab88fb84175239'
    const name = useRef()
    const cue = useRef()
    const actions = useRef()
    const intentions = useRef()

    const submitFunction = async(e) => {
        e.preventDefault()
        console.log("submit clicked")

        const newHabit = {
            userId: userId,
            name: name.current.value,
            eventCues: cue.current.value,
            preventingActions: actions.current.value,
            intentions: intentions.current.value
        }

        try {
            await axios.post("http://localhost:5000/server/habit/add", newHabit)
        } catch (err) {
            console.error(err.response.data)
        }
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
                    rows="5"
                    ref={cue}
                    required />

                <label htmlFor="preventingActions">What actions or thoughts may prevent you for carrying out this habit?</label>
                <TextareaAutosize
                    id="preventingActions"
                    rows="10"
                    ref={actions}
                    required />

                <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
                <TextareaAutosize
                    id="intention"
                    rows="10"
                    ref={intentions}
                    required />

                <div>
                    <button>Add habit</button>
                </div>
            </Form>
    )
}