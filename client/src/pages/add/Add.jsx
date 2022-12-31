import Navbar from "../../components/navbar/Navbar";
import { useRef } from "react"
import axios from "axios";

export default function Add() {
    const name = useRef()
    const cue = useRef()
    const actions = useRef()
    const intentions = useRef()

    const submitFunction = async(e) => {
        e.preventDefault()
        console.log("submit clicked")

        const newHabit = {
            id: (Math.floor(Math.random() * 10000) + 1).toString(),
            name: name.current.value,
            eventCues: cue.current.value,
            preventingActions: actions.current.value,
            intentions: intentions.current.value
        }

        try {
            await axios.post("http://localhost:5000/server/habit/add", newHabit)
            await axios.put(`http://localhost:5000/server/user/add-habit/${newHabit.id}`, {
                userId: '63b0873e52ab88fb84175239'
            })
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <>
        <Navbar />
        <form onSubmit={submitFunction}>
            <label htmlFor="habitName">Habit Name</label>
            <input
                id="habitName"
                type="text"
                ref={name}
                required>
            </input>

            <label htmlFor="eventCues">Event-based cue</label>
            <input
                id="eventCues"
                type="text"
                ref={cue}
                required>
            </input>

            <label htmlFor="preventingActions">What actions or thoughts may prevent you for carrying out this habit?</label>
            <input
                id="preventingActions"
                type="text"
                ref={actions}
                required>
            </input>

            <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
            <input
                id="intention"
                type="text"
                ref={intentions}
                required>
            </input>

            <button>
                Add habit
            </button>
        </form>
        </>
    )
}