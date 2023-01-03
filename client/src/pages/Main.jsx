import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Habit from "../components/Habit"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { Container } from "../components/styles/Container.styled"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function Main() {
    const habitId = useParams().id
    const lg = useMediaQuery('(min-width:660px)');

    if(lg) {
    return(
        <>
            <Navbar />
            <Container>
                <Sidebar />
                {habitId ? <Habit habitId={habitId}/> : "Select a habit or add a new one"}    
            </Container>
            <Footer />
        </>
    )}
    else {
        return(
            <>
            <Navbar />
            {habitId ? <Habit habitId={habitId}/> : <Sidebar />}    
            <Footer />
        </>
        )
    }
}