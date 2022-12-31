import Navbar from "../../components/navbar/Navbar";
import { useRef } from "react"

export default function Add() {
    const name = useRef()
    const cue = useRef()
    const actions = useRef()
    const intentions = useRef()

    const submitFunction = async(e) => {
        e.preventDefault()
        console.log("submit clicked")

        const newHabit = {
            id: Math.floor(Math.random * 10000) + 1,
            name: name,
            eventCues: cue,
            preventingActions: actions,
            intentions: intentions
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