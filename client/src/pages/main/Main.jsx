import Navbar from "../../components/navbar/Navbar"
import HabitList from "../../components/habitList/HabitList"
import Habit from "../../components/habit/Habit"
import Footer from "../../components/footer/Footer"
import { useState } from "react"

export default function Main() {
    const [selectedHabit, setSelectedHabit] = useState({})
    const [userHabits, setUserHabits] = useState([
        {
            id: 1,
            name:"habit one",
            eventCues: "waking up",
            daysToComplete: [
                {
                    dayOfWeek: "Monday",
                    toComplete: true
                },
                {
                    dayOfWeek: "Tuesday",
                    toComplete: true
                },
            ],
            calendarData: [
                {
                    date: new Date(),
                    status: 'Completed'
                }
            ],
            notificationFrequency: 1,
            daysCompleted: 5,
            daysMissed: 0,
            journal: "the journal entry",
            preventingActions: "preventing actions",
            intentions: "intentions",
            habitCompleted: false,
        },
        {
            id: 2,
            name:"habit two",
            eventCues: "going to bed",
            daysToComplete: [
                {
                    dayOfWeek: "Monday",
                    toComplete: true
                },
                {
                    dayOfWeek: "Tuesday",
                    toComplete: true
                },
            ],
            calendarData: [
                {
                    date: new Date(),
                    status: 'Skipped'
                }
            ],
            notificationFrequency: 1,
            daysCompleted: 5,
            daysMissed: 0,
            journal: "journal",
            preventingActions: "preventing actions",
            intentions: "intentions",
            habitCompleted: false,
        },
        {
            id: 3,
            name:"habit three",
            eventCues: "lunch time",
            daysToComplete: [
                {
                    dayOfWeek: "Monday",
                    toComplete: true
                },
                {
                    dayOfWeek: "Tuesday",
                    toComplete: true
                },
            ],
            calendarData: [
                {
                    date: new Date(),
                    status: 'Missed'
                }
            ],
            notificationFrequency: 1,
            daysCompleted: 5,
            daysMissed: 0,
            journal: "journal",
            preventingActions: "preventing actions",
            intentions: "intentions",
            habitCompleted: false,
        }
    ])

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