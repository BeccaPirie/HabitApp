import { useContext, useRef, useState } from "react"
import { UserContext } from "../context/user/UserContext"
import { EditProfileStyled } from "./styles/EditProfile.styled";
import { ButtonStyled } from "./styles/Button.styled";
import { FormGroup, FormControlLabel, Switch } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function Profile({axiosJWT}) {
    const {user, dispatch} = useContext(UserContext)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [notifSettings, setNotifSettings] = useState(user.notifications)
    const [notifications, setNotifications] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    const oldPass = useRef()
    const newPass = useRef()
    const confirmPass = useRef()

    const onSubmit = async(e) => {
        e.preventDefault()
        console.log("on submit")

        const updatedUser = {
            ...user,
            username: username,
            email: email
        }

        try {
            await axiosJWT.put('http://localhost:5000/server/user/update', updatedUser,{
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_USER", payload: updatedUser})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const updatePassword = async(e) => {
        e.preventDefault()
        console.log("update password")

        if(newPass.current.value !== confirmPass.current.value) {
            confirmPass.current.setCustomerValidity("Passwords don't match")
            return
        }

        const passwords = {
            oldPassword: oldPass.current.value,
            newPassword: newPass.current.value
        }

        try {
           const res = await axiosJWT.put('http://localhost:5000/server/user/update-password', passwords, {
            headers: {authorization:'Bearer ' + user.token}
        }) 
        dispatch({type:"UPDATE_PASSWORD", payload: res.data})
        } catch (err) {
            console.error(err.response.data)
        } 
    }

    const updateNotifications = async(e) => {
        e.preventDefault()
        console.log("update notifications")
        setNotifSettings(!user.notifications)

        const updatedUser = {
            ...user,
            notifications: !user.notifications
        }

        // get user notifications
        try {
            const res = await axiosJWT.get('http://localhost:5000/server/notification/', {
                headers: {authorization:'Bearer ' + user.token}
            })
            console.log(res.data)
            setNotifications(res.data)
        } catch (err) {
            console.error(err.response.data)
        }

        if(notifSettings) {
            // set notifications
            try {
                notifications.forEach(async(n) => {
                    await axiosJWT.post('http://localhost:5000/server/notification/set-notification', n, {
                    headers: {authorization:'Bearer ' + user.token}
                    })
                })
                console.log("notifications turned on")
            } catch(err) {
                console.error(err.response.data)
            }
        }
        else {
            //delete notifications
            try {
                notifications.forEach(async(n) => {
                    await axiosJWT.delete('http://localhost:5000/server/notification/', n, {
                        headers: {authorization:'Bearer ' + user.token}
                    })
                })
                console.log("notifications turned off")
            } catch(err) {
                console.error(err.response.data)
            }
        }

        // update user
        try {
            await axiosJWT.put('http://localhost:5000/server/user/update', updatedUser, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type: "UPDATE_USER", payload: updatedUser})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const deleteAccount = async() => {
        console.log("delete account")
        try {
            await axiosJWT.delete('http://localhost:5000/server/user', {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"DELETE_USER"})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return (     
        <EditProfileStyled>
            <form className="form" onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <ButtonStyled id="update-btn">Save Changes</ButtonStyled>
            </form>

            <form  className="password-form" onSubmit={updatePassword}>
                <label htmlFor="old-pass">Old Password:</label>
                <input
                    type="password"
                    id="old-pass"
                    ref={oldPass}
                />
                <label htmlFor="new-pass">New Password:</label>
                <input
                    type="password"
                    id="new-pass"
                    ref={newPass}
                />
                <label htmlFor="confirm-pass">Confirm New Password:</label>
                <input
                    type="password"
                    id="confirm-pass"
                    ref={confirmPass}
                />
                <ButtonStyled>Update Password</ButtonStyled>
            </form>

            {/* <form className="notif-form">
                <span id="notif-header">Allow Notifications?</span>
                <label className="notif-switch">
                    <input
                        type="checkbox"
                        checked={notifSettings}
                        onChange={updateNotifications}       
                    />
                    <span className="slider"></span>
                </label>
            </form> */}

            <FormGroup>
                <FormControlLabel
                label={"Notifications"}
                control={
                    <Switch
                        checked={notifSettings}
                        onChange={updateNotifications}
                    />}
                />
            </FormGroup>


            <div className="delete-acc">
                <ButtonStyled onClick={() => setOpenAlert(true)}>
                    Delete Account
                </ButtonStyled>

                <Dialog
                    open={openAlert}
                    onClose={() => setOpenAlert(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete your account?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={() => setOpenAlert(false)}>No</Button>
                        <Button onClick={deleteAccount} autoFocus>
                            Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        </EditProfileStyled>
    )
}