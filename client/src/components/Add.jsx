import { useRef } from "react"
import axios from "axios"

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
            <form onSubmit={submitFunction}>
                <div>
                    <label htmlFor="habitName">Habit Name</label>
                    <input
                        id="habitName"
                        type="text"
                        ref={name}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="eventCues">Event-based cue</label>
                    <input
                        id="eventCues"
                        type="text"
                        ref={cue}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="preventingActions">What actions or thoughts may prevent you for carrying out this habit?</label>
                    <input
                        id="preventingActions"
                        type="text"
                        ref={actions}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="intention">What can you tell yourself or do to prevent unwanted actions?</label>
                    <input
                        id="intention"
                        type="text"
                        ref={intentions}
                        required>
                    </input>
                </div>

                <div>
                    <button>Add habit</button>
                </div>
            </form>
    )
}