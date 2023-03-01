import Rightbar from "../components/Rightbar"
import { PageContainer } from "../components/styles/PageContainer.styled"
import { Outlet } from 'react-router-dom'
import { MainContainer } from "../components/styles/MainContainer.styled"
import HabitList from "../components/HabitList"
import { useEffect, useContext, useState } from "react"
import { HabitContext } from "../context/habit/HabitContext"
import { UserContext } from "../context/user/UserContext"
import Alert from "../components/Alert"

export default function Index({lg, axiosJWT}) {
    const { dispatch } = useContext(HabitContext)
    const { user } = useContext(UserContext)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    // fetch users habits
    useEffect(() => {
        const fetchUserHabits = async () => {
            dispatch({ type: "FETCH_START"})
            try{
                const res = await axiosJWT.get(`http://localhost:5000/server/habit/get-habits`, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({type:"FETCH_HABITS", payload:res.data})
            }
            catch(err) {
                dispatch({type:"FETCH_ERROR", payload:err.response.data})
            }
        }
        fetchUserHabits()
    },[user._id, dispatch, user.token])

    // handle alert display
    const alert = (message) => {
        setShowAlert(true)
        setAlertMessage(message)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }

    return(
        <PageContainer> 
            {lg && <HabitList />}
            <MainContainer>
            {showAlert && <Alert message={alertMessage}/>}
                <Outlet context={alert}/>
            </MainContainer>
            {lg && <Rightbar />}
        </PageContainer>
    )
}