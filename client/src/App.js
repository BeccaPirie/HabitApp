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

export default function App() {
  const lg = useMediaQuery('(min-width:660px)')
  const { user } = useContext(UserContext)

  requestNotificationPermission()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={user ? <Index lg={lg}/> : <Login />}>
          <Route path='' element={<NoSelection lg={lg}/>}></Route>
          <Route path=':id' element={<Habit />}></Route>
          <Route path='add' element={<Add />}></Route>
          <Route path=':id/Details' element={<Details />}></Route>
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

