import Navbar from "../../components/navbar/Navbar"
import HabitList from "../../components/habitList/HabitList"
import Habit from "../../components/habit/Habit"
import Footer from "../../components/footer/Footer"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Main() {
    const [user, setUser] = useState({})
    const [userHabits, setUserHabits] = useState([])
    const [selectedHabit, setSelectedHabit] = useState({})

    useEffect(() => {
        const fetchUserHabits = async () => {
            const res = await axios.get(`http://localhost:5000/server/user/get-habits/63b0873e52ab88fb84175239`)
            setUserHabits(res.data)
        }
        fetchUserHabits()
    },[user])

    const handleHabitClick = (id) => {
        const updateObj = userHabits.find((habit) => habit.id === id)
        setSelectedHabit(updateObj)
    }

    return(
        <>
            <Navbar />
            <HabitList habits={userHabits} handleHabitClick={handleHabitClick}/>
            {Object.keys(selectedHabit).length === 0 ? "Select a habit or create a new one" : <Habit habit={selectedHabit}/>}
            <Footer />
        </>
    )
}