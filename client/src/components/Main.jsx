// import { useParams } from "react-router-dom"
// import HabitList from "./HabitList"
// import Habit from "./Habit"
// import { Link } from "react-router-dom"
// import Calendar from "react-calendar"
// import { StyledCalendar } from "./styles/Calendar.styled"
// import { useState } from "react"

// export default function Home() {
//     const habitId = useParams().id
//     const [date, setDate] = useState(new Date())

//     if(habitId) {
//         return(
//         <>
//             <Habit habitId={habitId} />

//             <StyledCalendar>
//                 <Calendar onChange={setDate} value={date}/>
//             </StyledCalendar>

//             <Link to={`/${habitId}/details`}>
//                <button>Details</button> 
//             </Link>
//         </>
//         )  
//     }
//     else {
//         return(
//         <>
//             <HabitList />
//         </>
//         )
//     }   
// }