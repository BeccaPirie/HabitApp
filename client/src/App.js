import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import Edit from './pages/Edit'
import EditProfile from './pages/EditProfile'
import Login from './pages/Login'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/:id?' element={<Main />}>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/signup' element={<Signup />}>
        </Route>
        <Route path='/add' element={<Add />}>
        </Route>
        <Route path='/edit' element={<Edit />}>
        </Route>
        <Route path='/profile' element={<Profile />}>
        </Route>
        <Route path='/edit-profile' element={<EditProfile />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
