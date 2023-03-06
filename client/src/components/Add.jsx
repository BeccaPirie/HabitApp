import { useContext, useState, useEffect } from "react"
import { Form } from "./styles/Form.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import { useNavigate, useOutletContext } from "react-router-dom"
import { checkboxes } from "../checkboxes"
import { UserContext } from "../context/user/UserContext"
import { ButtonStyled } from "./styles/Button.styled"
import { Ideas } from "./styles/Ideas.styled"
import axios from "axios"

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
                const res = await axios.get('http://localhost:5000/server/idea/')
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
            habitCompleted: false
            // TODO create new notification
        }

        try {
            const res = await axiosJWT.post("http://localhost:5000/server/habit/add", newHabit, {
                headers: {authorization:'Bearer ' + user.token}
            })

            // add notification
        // await axios.put(`http://localhost:5000/server/notification/set-notification/${habit.userId}`, {
        //     title: habit.name,
        //     message: `Have you completed ${habit.name} today?`,
        //     days: notifDays,
        //     time: '18:00' // let users select morning/afternoon/evening
        // })

            dispatch({type: "ADD_HABIT", payload: res.data})
            navigate(`/${res.data._id}`)
            alert('Habit added')
        } catch (err) {
            console.error(err.response.data)
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
                
                <label htmlFor="habitName">Habit Name</label>
                <div className="nameContainer">
                    <input
                        id="habitName"
                        type="text"
                        value={habit.name || ''}
                        onChange={(e) => setHabit({...habit, name: e.target.value})}
                        required />

                    <ButtonStyled
                        type="button"
                        onClick={() => setShowIdeas(!showIdeas)}
                        className="ideasBtn">
                            Ideas
                    </ButtonStyled>   
                </div>
                
                {showIdeas && <Ideas>
                    <ul>
                        {ideas.map((idea, index) => {
                            return <li
                                    key={index}
                                    className="ideaItem"
                                    onClick={() => handleIdeaClick(idea.name)}>
                                        {idea.name}
                                    </li>
                        })}
                    </ul>
                </Ideas>}

                <label htmlFor="eventCues">Event-based cue</label>
                <TextareaAutosize
                    id="eventCues"
                    rows={5}
                    value={habit.eventCues || ''}
                    onChange={(e) => setHabit({...habit, eventCues: e.target.value})}
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
                    <ButtonStyled id="add-btn">Add habit</ButtonStyled>
                </div>
            </Form>
        </>
    )
}