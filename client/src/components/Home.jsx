import Habit from "./Habit"
import Sidebar from "./Sidebar"
import NoSelection from "./NoSelection"
import { useParams } from "react-router-dom"

export default function Home({lg}) {
    const habitId = useParams().id
    if(lg) {
        return(
        <>
            {habitId ? <Habit habitId={habitId}/> : <NoSelection />}
        </>
        )  
    }
    else {
        return(
            <>
            {habitId ? <Habit habitId={habitId}/> : <Sidebar />}
        </>
        )
    }
    
}