import Navbar from "../../components/navbar/Navbar"
import HabitList from "../../components/habitList/HabitList"
import Habit from "../../components/habit/Habit"
import Footer from "../../components/footer/Footer"
import { useParams } from "react-router-dom"

export default function Main() {
    const habitId = useParams().id

    return(
        <>
            <Navbar />
            <HabitList />
            {habitId ? <Habit habitId={habitId}/> : "Select a habit or add a new one"}
            <Footer />
        </>
    )
}