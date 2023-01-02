import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from './pages/add/Add'
import Edit from './pages/edit/Edit'
import EditProfile from './pages/editProfile/EditProfile'
import Login from './pages/login/Login'
import Main from './pages/main/Main'
import Profile from './pages/profile/Profile'
import Signup from './pages/signup/Signup'

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
