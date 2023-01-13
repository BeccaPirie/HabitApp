import Rightbar from "../components/Rightbar"
import { PageContainer } from "../components/styles/PageContainer.styled"
import { Outlet } from 'react-router-dom'
import { MainContainer } from "../components/styles/MainContainer.styled"
// import Navbar from "../components/Navbar"
import HabitList from "../components/HabitList"
import { useEffect, useContext } from "react"
import axios from "axios"
import { HabitContext } from "../context/habit/HabitContext"

export default function Index({lg}) {
    const userId = "63b0873e52ab88fb84175239"
    const { dispatch } = useContext(HabitContext)

    useEffect(() => {
        const fetchUserHabits = async () => {
            dispatch({ type: "FETCH_START"})
            try{
                const res = await axios.get(`http://localhost:5000/server/habit/get-habits/${userId}`)
                dispatch({type:"FETCH_HABITS", payload:res.data})
            }
            catch(err) {
                dispatch({type:"FETCH_ERROR", payload:err.response.data})
            }
        }
        fetchUserHabits()
    },[userId, dispatch])

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