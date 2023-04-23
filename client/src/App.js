import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Index from './pages/Index'
import useMediaQuery from "@mui/material/useMediaQuery"
import Details from './components/Details'
import Add from './components/Add'
import Habit from './components/Habit'
import About from './components/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useContext } from 'react'
import { UserContext } from './context/user/UserContext'
import axios from "axios"
import jwt_decode from "jwt-decode"
import Profile from './components/Profile'
import HabitList from './components/HabitList'
import scheduleLib from "node-schedule"

export default function App() {
  const lg = useMediaQuery('(min-width:660px)')
  const { user, dispatch } = useContext(UserContext)

  // refresh token when token has expired
    const refreshToken = async () => {
        try {
            const res = await axios.post('https://habitbuild-api.onrender.com/server/auth/refresh-token', {token: user.refreshToken, id: user._id})
            dispatch({type:"UPDATE_TOKENS", payload: res.data})
            return res.data
        } catch (err) {
            console.error(err.response.data)
            dispatch({type:"LOGOUT"})
            window.location.href = "https://habitbuild.onrender.com"
        }
    }

    // create new axios instance for JWT
    const axiosJWT = axios.create()

    // check if token has expired
    axiosJWT.interceptors.request.use(async(config) => {
        let date = new Date()
        const decoded = jwt_decode(user.token)
        if(decoded.exp * 1000 < date.getTime()) {
            const data = await refreshToken()
            config.headers['authorization'] = 'Bearer ' + data.accessToken
          }
        return config
    },(err) => {
        return Promise.reject(err)
    })

    // display notifications in UI
    const updateMessages = async () => {
      const res = await axiosJWT.get('https://habitbuild-api.onrender.com/server/user/', {
          headers: {authorization:'Bearer ' + user.token}
      })
      dispatch({type:"ADD_MESSAGE", payload: res.data})
  }

    // update messages after notifications are sent
    scheduleLib.scheduleJob('10 10 * * *', async() => {updateMessages()})
    scheduleLib.scheduleJob('10 14 * * *', async() => {updateMessages()})
    scheduleLib.scheduleJob('10 18 * * *', async() => {updateMessages()})
    scheduleLib.scheduleJob('10 21 * * *', async() => {updateMessages()})

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={user ? <Index lg={lg} axiosJWT={axiosJWT} /> : <Login />}>
          <Route path='' element={lg ? <About/> : <HabitList/>}></Route>
          <Route path=':id' element={<Habit axiosJWT={axiosJWT} />}></Route>
          <Route path='add' element={<Add axiosJWT={axiosJWT}/>}></Route>
          <Route path=':id/Details' element={<Details axiosJWT={axiosJWT}/>}></Route>
          <Route path='profile' element={<Profile axiosJWT={axiosJWT}/>}></Route>
          <Route path='about' element={<About axiosJWT={axiosJWT}/>}></Route>
        </Route>
        <Route path='/signup'
          element={user ? <Navigate to='/' replace /> : <Signup />}>
        </Route>
        <Route path='/login'
          element={user ? <Navigate to='/' replace /> : <Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

