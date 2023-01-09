import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"

export default function Details() {
    const habitId = useParams().id
    const [habit, setHabit] = useState({})

    useEffect(() => {
        const fetchHabit = async() => {
            try {
               const res = await axios.get(`http://localhost:5000/server/habit/${habitId}`)
                setHabit(res.data) 
            } catch (err) {
            console.error(err.response.data)
            } 
        }
        fetchHabit()
    }, [habitId])

    const submitFunction = async(e) => {
        e.preventDefault()

        try {
            await axios.put(`http://localhost:5000/server/habit/update/${habit._id}`, habit)
        } catch (err) {
            console.error(err.response.data)
        }
    }
    return(
        <>
            <Form onSubmit={submitFunction}>
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
        </>
        
    )
}