import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import useMediaQuery from "@mui/material/useMediaQuery"
import Details from './components/Details'
import Add from './components/Add'
import Home from './components/Home'

export default function App() {
  const lg = useMediaQuery('(min-width:660px)');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start lg={lg}/>}>
          {/* <Route path='' element={<Home />}></Route> */}
          <Route path=':id?' element={<Home />}></Route>
          <Route path='add' element={<Add />}></Route>
          <Route path=':id/Details' element={<Details />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

