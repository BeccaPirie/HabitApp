import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Index from './pages/Index'
import useMediaQuery from "@mui/material/useMediaQuery"
import Details from './components/Details'
import Add from './components/Add'
import Habit from './components/Habit'
import NoSelection from './components/NoSelection'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { requestNotificationPermission } from './firebaseAdmin'
import { useContext } from 'react'
import { UserContext } from './context/user/UserContext'
import axios from "axios"
import jwt_decode from "jwt-decode"

export default function App() {
  const lg = useMediaQuery('(min-width:660px)')
  const { user, dispatch } = useContext(UserContext)

  requestNotificationPermission()

  // refresh token when token has expired
    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:5000/server/auth/refresh-token', {token: user.refreshToken})
            dispatch({type:"UPDATE_TOKENS", payload: res.data})
            return res.data
        } catch (err) {
            console.error(err.response.data)
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={user ? <Index lg={lg} axiosJWT={axiosJWT} /> : <Login />}>
          <Route path='' element={<NoSelection lg={lg} />}></Route>
          <Route path=':id' element={<Habit axiosJWT={axiosJWT} />}></Route>
          <Route path='add' element={<Add axiosJWT={axiosJWT}/>}></Route>
          <Route path=':id/Details' element={<Details axiosJWT={axiosJWT}/>}></Route>
        </Route>
        <Route path='/signup'
          element={user ? <Navigate to='/' replace /> : <Signup />}>
        </Route>
        <Route path='/login'
          element={user ? <Navigate to='/' replace /> :<Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

