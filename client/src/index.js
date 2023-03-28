import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from "./context/user/UserContext"
import { HabitContextProvider } from './context/habit/HabitContext'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <UserContextProvider>
      <HabitContextProvider>
        <App />
      </HabitContextProvider>
    </UserContextProvider>
  // </React.StrictMode>
)