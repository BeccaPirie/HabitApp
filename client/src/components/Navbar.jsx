import { StyledNavbar } from "./styles/Navbar.styled"
import { Link } from "react-router-dom"
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {IconButton, Badge, Chip, Avatar, Typography} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
// import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/user/UserContext"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar({text, axiosJWT}) {
    const [showMessages, setShowMessages] = useState(false)
    const { user, dispatch } = useContext(UserContext)
    const [messages, setMessages] = useState(user.messages.reverse())
    const [showBadge, setShowBadge] = useState(true)

    const deleteMessage = async(id) => {
        try {
            await axiosJWT.put(`http://localhost:5000/server/user/remove-message/`,{id:id}, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: "DELETE_MESSAGE", payload: id})
        } catch (err) {
            console.error(err.response.data)
        }  
    }

    const openNotifications = async() => {
        if(!showMessages) {
            const unreadMessages = user.messages.filter(message => message.read === false)
            for(const message of unreadMessages) {
                const update = {
                    id: message._id,
                    read: true
                }
                await axiosJWT.put('http://localhost:5000/server/user/update-message', update, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                await dispatch({type:"UPDATE_MESSAGE", payload: update})
                setShowBadge(false)
            }
        }
        setShowMessages(!showMessages)
    }

    useEffect(() => {
        setMessages(user.messages.reverse())
        if(user.messages.length === 0) {
            setShowMessages(false)
            setShowBadge(false)
        }
        else if(user.messages.every(message => message.read === true)) {
            setShowBadge(false)
        }
        else {
            setShowBadge(true)
        }
    },[user, user.messages])
    
    return(
        <StyledNavbar>
            <div className="left">
                <h2>{text}</h2>
            </div>
            
            <div className="right">  
                <ul>
                    {/* <Link to="/about">
                        <li>About</li>
                    </Link> */}
                    <div>
                    <IconButton
                        aria-label={`__ notifications`}
                        onClick={openNotifications}>
                        {showBadge ?
                        <Badge variant="dot" color="primary">
                            <NotificationsOutlinedIcon />
                        </Badge> :
                        <NotificationsOutlinedIcon />}
                    </IconButton>

                    {showMessages && 
                    <Paper className="notif-list">
                        <List >
                            {messages.length > 0 && messages.map((m, index) => {
                                return(
                                    <ListItem key={index}
                                        secondaryAction= {
                                            <IconButton
                                                edge="end"
                                                aria-label="close"
                                                onClick={() => deleteMessage(m._id)}>
                                                <CloseIcon />
                                            </IconButton>
                                        }>
                                        <Link to={m.habitId}>
                                            <Typography>{m.message}</Typography>
                                        </Link>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>}
                    </div>

                    <Link to="/profile">
                        <IconButton aria-label="">
                            <Chip
                                avatar={<Avatar>R</Avatar>}
                                label={<SettingsIcon />}
                            />
                        </IconButton>
                    </Link>
                </ul>
            </div>
        </StyledNavbar>
    )
}