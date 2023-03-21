import Rightbar from "../components/Rightbar"
import { PageContainer } from "../components/styles/PageContainer.styled"
import { Outlet } from 'react-router-dom'
import { MainContainer } from "../components/styles/MainContainer.styled"
import HabitList from "../components/HabitList"
import { useEffect, useContext, useState } from "react"
import { HabitContext } from "../context/habit/HabitContext"
import { UserContext } from "../context/user/UserContext"
import Navbar from "../components/Navbar"
import { getFirebaseToken } from "../firebaseAdmin"
import axios from "axios"
import Alert from '@mui/material/Alert';

export default function Index({lg, axiosJWT}) {
    const { dispatch } = useContext(HabitContext) || []
    const { user } = useContext(UserContext)
    const [showAlert, setShowAlert] = useState(false)
    const [severity, setSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [firebaseToken, setToken] = useState('')

    useEffect(() => {
        try {
            getFirebaseToken(setToken)
            const setFirebaseToken = async() => {
                await axios.put('http://localhost:5000/server/auth/firebase-token', {
                    userId: user._id,
                    firebaseToken: firebaseToken
                })
                dispatch({ type: "UPDATE_FIREBASE_TOKEN", payload: firebaseToken})
            }
            setFirebaseToken()
        } catch (err) {
            console.error(err.response.data)
        }
        
    }, [user._id, firebaseToken, dispatch])

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
    },[user._id, dispatch, user.token, axiosJWT])

    // handle alert display
    const alert = (message, timeout, severity) => {
        setAlertMessage(message)
        setSeverity(severity)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, timeout);
    }

    return(
        <>
            <PageContainer> 
            
                {lg && <HabitList />}
                    <MainContainer>
                        {showAlert && <Alert className="alert" severity={severity} onClose={() => {setShowAlert(false)}}>
                            {alertMessage}
                        </Alert>}
                        <Navbar text={`Welcome back ${user.username}!`} axiosJWT={axiosJWT}/>
                        <Outlet context={alert}/>
                    </MainContainer>
                {lg && <Rightbar axiosJWT={axiosJWT}/>}
            </PageContainer>
        </>
    )
}