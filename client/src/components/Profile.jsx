import { useContext, useRef, useState, useEffect } from "react"
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
    const [notifications, setNotifications] = useState([])
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
            confirmPass.current.setCustomValidity("Passwords don't match")
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
        console.log("updating notifications")
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

        // if notifications are currently switched off, set schedules for notifications
        if(!user.notifications) {
            try {
                console.log(notifications)
                notifications.forEach(async(n) => {
                    const data = {
                        title: n.notification.title,
                        body: n.notification.body,
                        days: n.days,
                        time: n.time,
                        userId: n.userId,
                        habitId: n.habitId
                    }
                    console.log(n)
                    await axiosJWT.post('http://localhost:5000/server/notification/set-notification', data, {
                    headers: {authorization:'Bearer ' + user.token}
                    })
                })
                // call notification settings?
                console.log("notifications turned on")
            } catch(err) {
                console.error(err.response.data)
            }
        }
        else {
            // delete scheduled notifications as notifications have been switched off
            try {
                const ids = notifications.map(n => n._id)
                console.log(ids)

                if(ids.length > 0) {
                    await axiosJWT.delete('http://localhost:5000/server/notification', {ids: ids}, {
                        headers: {authorization: 'Bearer ' + user.token}
                    })
                    console.log("notification turned off")
                }
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

            {/* <FormGroup>
                <FormControlLabel
                label={"Notifications"}
                control={
                    <Switch
                        checked={notifSettings}
                        onChange={updateNotifications}
                    />}
                />
            </FormGroup> */}


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