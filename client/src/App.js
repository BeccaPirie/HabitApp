import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import useMediaQuery from "@mui/material/useMediaQuery"
import Details from './components/Details'
import Add from './components/Add'
import Habit from './components/Habit'
import NoSelection from './components/NoSelection'

export default function App() {
  const lg = useMediaQuery('(min-width:660px)');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index lg={lg}/>}>
          <Route path='' element={<NoSelection lg={lg}/>}></Route>
          <Route path=':id' element={<Habit />}></Route>
          <Route path='add' element={<Add />}></Route>
          <Route path=':id/Details' element={<Details />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

