import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from "./context/user/UserContext"
import { HabitContextProvider } from './context/habit/HabitContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <HabitContextProvider>
        <App />
      </HabitContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)