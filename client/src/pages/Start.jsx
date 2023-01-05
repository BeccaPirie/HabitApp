import Sidebar from "../components/Sidebar"
import Rightbar from "../components/Rightbar"
import { PageContainer } from "../components/styles/PageContainer.styled"
import { Outlet } from 'react-router-dom'
import { MainContainer } from "../components/styles/MainContainer.styled"

export default function Main({lg}) {
    if(lg) {
        return(
            <>
                <PageContainer>
                    <Sidebar />
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