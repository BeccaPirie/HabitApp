import { useState, useEffect, useContext } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { useParams } from "react-router-dom"
import { StyledHabit } from "./styles/Habit.styled"
import TextareaAutosize from "react-autosize-textarea"
import { HabitContext } from "../context/habit/HabitContext"
import Chart from "./Chart"
import { UserContext } from '../context/user/UserContext'
import { ButtonStyled } from "./styles/Button.styled"
import CalendarComponent from "./Calendar"

export default function Habit({axiosJWT}) {
    const [habit, setHabit] = useState({})
    const [isComplete, setIsComplete] = useState(habit.habitCompleted)
    const [journal, setJournal] = useState(habit.journal)
    const habitId = useParams().id
    const { userHabits, dispatch } = useContext(HabitContext) || []
    const { user } = useContext(UserContext)
    const alert = useOutletContext()

    // set habit
    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res =  await axiosJWT.get(`http://localhost:5000/server/habit/get-habit/${habitId}`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                setHabit(res.data)
            } catch (err) {
                console.error(err.response.data)
            }
        }
        fetchHabit()
    }, [user._id, habitId, userHabits, user.token, axiosJWT])

    // set isComplete
    useEffect(() => {
        setIsComplete(habit.habitCompleted)
    }, [habit, habit.habitCompleted])

    // set journal
    useEffect(() => {
        setJournal(habit.journal)
    }, [habit, habit.journal])

    // handle complete button click
    const completeButtonClick = async () => {
        try {
            const updatedHabit = {...habit, habitCompleted: !isComplete}
            await axiosJWT.put(`http://localhost:5000/server/habit/update/${habit._id}`, updatedHabit, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: 'COMPLETE_HABIT', payload: {id: habit._id, complete: !isComplete}})
        } catch (err) {
            console.error(err.response.data)
        }
        setIsComplete(!isComplete)
        //TODO stop notifications
    }

    // handle journal button click
    const journalButtonClick = async (e) => {
        e.preventDefault()
        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/journal/${habit._id}`, {
                journal: journal
            }, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: 'UPDATE_JOURNAL', payload: {id: habit._id, journal: journal}})
            alert("Journal updated")
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <StyledHabit>
            <div className="habit-top">
                <h2>{habit.name}</h2> 
                <ButtonStyled onClick={completeButtonClick}>
                    {isComplete ? "Mark habit as incomplete" : "Mark habit as complete"}
                </ButtonStyled>  
            </div>

            <CalendarComponent 
                axiosJWT={axiosJWT}
                habit={habit}
                dispatch={dispatch}
            />

            <form onSubmit={(e)=> journalButtonClick(e)}>
                <label htmlFor="journal">
                    Journal notes
                </label>
                <TextareaAutosize
                    id="journal"
                    rows={15}
                    value={journal || ''}
                    onChange={e => setJournal(e.target.value)}
                />
                <div>
                    <ButtonStyled>Update journal</ButtonStyled>
                </div>
            </form>

            <Chart data={habit.calendarData}/>

            <Link to={`/${habitId}/details`}>
                <ButtonStyled className="details-btn">Details</ButtonStyled> 
            </Link>
            
        </StyledHabit>
    )
}