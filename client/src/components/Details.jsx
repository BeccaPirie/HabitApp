import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import { UserContext } from "../context/user/UserContext"
import { ButtonStyled } from "./styles/Button.styled"

export default function Details({axiosJWT}) {
    const habitId = useParams().id
    const [habit, setHabit] = useState({})
    const { dispatch } = useContext(HabitContext)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const alert = useOutletContext()

    // get habit
    useEffect(() => {
        const fetchHabit = async() => {
            try {
               const res = await axiosJWT.get(`http://localhost:5000/server/habit/get-habit/${habitId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
               setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            } 
        }
        fetchHabit()
    }, [user._id, habitId, axiosJWT, user.token])

    // form submit
    const onSubmitClick = async(e) => {
        e.preventDefault()

        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/update/`, habit, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: "UPDATE_HABIT", payload: habit})
            // TODO set notification
            navigate(`/${habit._id}`)
            alert("Habit updated")
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const updateDaysToComplete = (dayOfWeek) => {
        const updateToComplete = habit.daysToComplete.map((day) => 
            day.dayOfWeek === dayOfWeek ? {...day, toComplete: !day.toComplete} : {...day, toComplete: day.toComplete}
        )
        setHabit({...habit, daysToComplete: updateToComplete})
    }

    const deleteHabit = async() => {
        await axiosJWT.delete(`http://localhost:5000/server/habit/delete/${habitId}`, {
            headers: {authorization:'Bearer ' + user.token}
        })
        dispatch({type: "DELETE_HABIT", payload: habitId})
        navigate('/')
        alert("Habit deleted")
        // TODO delete scheduled notifications
    }

    return(
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

            <div className="submit-div">
                <ButtonStyled type="submit" id="save-btn">Save</ButtonStyled>
            </div>    
            <div>         
                <ButtonStyled type="button" id="delete-btn" onClick={deleteHabit}>Delete Habit</ButtonStyled>
            </div> 
        </Form>
    )
}