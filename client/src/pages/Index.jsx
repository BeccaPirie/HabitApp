import Rightbar from "../components/Rightbar"
import { PageContainer } from "../components/styles/PageContainer.styled"
import { Outlet } from 'react-router-dom'
import { MainContainer } from "../components/styles/MainContainer.styled"
import HabitList from "../components/HabitList"
import { useEffect, useContext } from "react"
import axios from "axios"
import { HabitContext } from "../context/habit/HabitContext"
import { UserContext } from "../context/user/UserContext"

export default function Index({lg}) {
    const { dispatch } = useContext(HabitContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        const fetchUserHabits = async () => {
            dispatch({ type: "FETCH_START"})
            try{
                const res = await axios.get(`http://localhost:5000/server/habit/get-habits/${user._id}`)
                dispatch({type:"FETCH_HABITS", payload:res.data})
            }
            catch(err) {
                dispatch({type:"FETCH_ERROR", payload:err.response.data})
            }
        }
        fetchUserHabits()
    },[user._id, dispatch])

    return(
        <>
            <PageContainer> 
                {lg && <HabitList />}
                <MainContainer>
                    <Outlet />
                </MainContainer>
                {lg && <Rightbar />}
            </PageContainer>
        </>
    )
}