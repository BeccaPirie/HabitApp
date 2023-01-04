import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Container } from "../components/styles/Container.styled"
import { Outlet } from 'react-router-dom'

export default function Main({lg}) {
    if(lg) {
        return(
            <>
                <Navbar />
                <Container>
                    <Sidebar />
                    <Outlet />
                </Container>
            </>
        )}
    else {
        return(
            <>
                <Navbar />
                <Outlet />
            </>
        )
    }
}