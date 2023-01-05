import HabitCalendar from "./HabitCalendar"
import { useParams } from "react-router-dom"
import HabitList from "./HabitList"
import Habit from "./Habit"
import Journal from "./Journal"
import { Link } from "react-router-dom"

export default function Home() {
    const habitId = useParams().id

    if(habitId) {
        return(
        <>
            <Habit habitId={habitId} />
            <HabitCalendar />
            <Journal />       
            <Link to={`/${habitId}/details`}>
               <button>Details</button> 
            </Link>
        </>
        )  
    }
    else {
        return(
        <>
            <HabitList />
        </>
        )
    }   
}