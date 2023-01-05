import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import useMediaQuery from "@mui/material/useMediaQuery"
import Edit from './components/Edit'
import Add from './components/Add'
import Home from './components/Home'

export default function App() {
  const lg = useMediaQuery('(min-width:660px)');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main lg={lg}/>}>
          <Route path=':id?' element={<Home lg={lg} />}></Route>
          <Route path='add' element={<Add />}></Route>
          <Route path=':id/edit' element={<Edit />}></Route>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/signup' element={<Signup />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
