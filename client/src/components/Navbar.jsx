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
    // const [showMessages, setShowMessages] = useState(false)
    const { user, dispatch } = useContext(UserContext)
    // const [messages, setMessages] = useState(user.messages.reverse())
    // const [showBadge, setShowBadge] = useState(!user.messages.every(message => message.read === true))


    // const deleteMessage = async(id) => {
    //     await axiosJWT.put('http://localhost:5000/server/user/remove-message', {id:id}, {
    //         headers: {authorization:'Bearer ' + user.token}
    //     })
    //     dispatch({type: "DELETE_MESSAGE", payload: id})
    // }

    // const openNotifications = async() => {
    //     setShowMessages(!showMessages)
    // }

    // const openNotifications = async() => {
    //     if(!showMessages) {
    //         console.log("away to show messages ...")
    //         const filteredMsgs = user.messages.filter(message => message.read === false)
    //         console.log(filteredMsgs)
    //         for(const message of filteredMsgs) {
    //             console.log(message.read)
    //             const update = {
    //                 id: message._id,
    //                 read: true
    //             }
    //             // console.log("sending to server to update ...")
    //             await axiosJWT.put('http://localhost:5000/server/user/update-message', update, {
    //                 headers: {authorization:'Bearer ' + user.token}
    //             })
    //             console.log("updated server side")
                // console.log("now updating context")
                // await dispatch({type:"UPDATE_MESSAGE", payload: update})
                // console.log("updated client side:")
                // console.log(user.messages)
        //     }
        // }

        // setShowMessages(!showMessages)
        // console.log("Show messages: " + showMessages)
        // if(!showMessages && showBadge) {
        //     const filtered = messages.filter(message => message.read === false)
        //     // messages.filter(message => message.read === false).forEach(async(message) => {
        //     for(const message of filtered) {
        //         const update = {
        //             id: message._id,
        //             read: true
        //         }
        //         console.log("time to update...")
        //         await axiosJWT.put('http://localhost:5000/server/user/update-message', update, {
        //             headers: {authorization:'Bearer ' + user.token}
        //         })
        //         dispatch({type: "UPDATE_MESSAGE", payload: update})
        //         console.log("message.read now: " + message.read)
        //     }
        //     // setShowBadge(false)      
        // }
        // setShowMessages(!showMessages)
    // }

    // useEffect(() => {
    //     setMessages(user.messages.reverse())
    //     if(user.messages.every(message => message.read === true)) {
    //         console.log("Dont show badge")
    //         setShowBadge(false)
    //     } else {
    //         console.log("show badge")
    //         setShowBadge(true)
    //     }
    // },[user, user.messages])
    
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
                    {/* <div>
                    <IconButton
                        aria-label={`__ notifications`}
                        onClick={openNotifications}
                        >
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
                    </div> */}

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