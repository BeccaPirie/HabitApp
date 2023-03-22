import { StyledNavbar } from "./styles/Navbar.styled"
import { Link, useNavigate } from "react-router-dom"
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {IconButton, Badge, Chip, Avatar, Typography} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/user/UserContext"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from "@mui/base/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

export default function Navbar({text, axiosJWT}) {
    const [showMessages, setShowMessages] = useState(false)
    const { user, dispatch } = useContext(UserContext)
    const [messages, setMessages] = useState(user.messages.reverse())
    const [showBadge, setShowBadge] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

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
                dispatch({type:"UPDATE_MESSAGE", payload: update})
                setShowBadge(false)
            }
        }
        setShowMessages(!showMessages)
    }

    const logout = () => {
        setShowMenu(false)
        dispatch({type:"LOGOUT"})
        navigate('/')
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
                    <div>
                        <IconButton
                            aria-label={`notifications`}
                            onClick={openNotifications}>
                            {showBadge ?
                            <Badge variant="dot" color="primary">
                                <NotificationsOutlinedIcon />
                            </Badge> :
                            <NotificationsOutlinedIcon />}
                        </IconButton>
                        
                    {showMessages && 
                    <ClickAwayListener onClickAway={() => setShowMessages(false)}>
                        <Paper className="notif-list">
                            <List >
                                {messages.length > 0 ? messages.map((m, index) => {
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
                                }) : <div className="no-msg">No new notifications!</div>}
                            </List>
                        </Paper>
                    </ClickAwayListener>}
                    </div>

                    
                    <Stack direction="row" spacing={2}>
                        <IconButton
                            aria-label="account-button"
                            onClick={() => setShowMenu(!showMenu)}>
                            <Chip
                                avatar={<Avatar>R</Avatar>}
                                label={<SettingsIcon />}
                            />
                        </IconButton>
                        <div className="menu-list">
                        {showMenu &&
                        <ClickAwayListener onClickAway={() => setShowMenu(false)}>
                            <Paper>
                                <MenuList
                                    id="account-menu"
                                    aria-labelledby="account-button">
                                    <Link to='/profile' onClick={()=> setShowMenu(false)}>
                                        <MenuItem>Settings</MenuItem>
                                    </Link>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </Paper>
                        </ClickAwayListener>}
                        </div>
                    </Stack>
                </ul>
            </div>
        </StyledNavbar>
    )
}