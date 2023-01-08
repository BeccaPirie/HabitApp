import Sidebar from "../components/Sidebar"
import Rightbar from "../components/Rightbar"
import { PageContainer } from "../components/styles/PageContainer.styled"
import { Outlet } from 'react-router-dom'
import { MainContainer } from "../components/styles/MainContainer.styled"
import Navbar from "../components/Navbar"
import HabitList from "../components/HabitList"

export default function Index({lg}) {
    if(lg) {
        return(
            <>
                <PageContainer>
                    <HabitList />
                    {/* <Navbar /> */}
                    <MainContainer>
                        <Outlet />
                    </MainContainer>
                    <Rightbar />
                </PageContainer>
            </>
        )}
    else {
        return(
            <>
                <Outlet />
            </>
        )
    }
}