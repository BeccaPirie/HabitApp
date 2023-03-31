import { useContext, useState } from "react"
import { UserContext } from "../context/user/UserContext"
import { EditProfileStyled } from "./styles/EditProfile.styled";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useOutletContext } from "react-router-dom"

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Profile({axiosJWT}) {
    const {user, dispatch} = useContext(UserContext)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [notifSettings, setNotifSettings] = useState(user.notifications)
    const [notifications, setNotifications] = useState([])
    const [openAlert, setOpenAlert] = useState(false)
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const alert = useOutletContext()

    const onSubmit = async(e) => {
        e.preventDefault()
        
        // client validation
        const checkUsername = username.length < 3 || username.length > 20
        const checkEmail = !regex.test(email)

        setUsernameError(checkUsername)
        setEmailError(checkEmail)

        // return from function if error exists
        if(checkUsername || checkEmail) return

        // if no error, send to server
        const updatedUser = {
            ...user,
            username: username,
            email: email
        }

        try {
            await axiosJWT.put('https://habitbuild-api.onrender.com/server/user/update', updatedUser,{
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_USER", payload: updatedUser})
            alert('Updated account', 3000, 'success')
        } catch (err) {
            alert("Error updating account", 3000, 'error')
        }
    }

    const updatePassword = async(e) => {
        e.preventDefault()

        // client side validation
        const checkPassLength = newPass.length < 6
        const checkPassMatch = confirmPass !== newPass

        // save state for display error on text fields
        setPassLength(checkPassLength)
        setPassError(checkPassMatch)

        // return from function if errors exist
        if(checkPassLength || checkPassMatch) return
        
        // if no errors, send to server  
        const passwords = {
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass
        }

        try {
            const res = await axiosJWT.put('https://habitbuild-api.onrender.com/server/user/update-password', passwords, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_PASSWORD", payload: res.data})
            alert('Updated password', 3000, 'success')
        } catch (err) {
            alert("Couldn't update password", 3000, 'error')
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
            const res = await axiosJWT.get('https://habitbuild-api.onrender.com/server/notification/', {
                headers: {authorization:'Bearer ' + user.token}
            })
            console.log(res.data)
            setNotifications(res.data)
        } catch (err) {
            console.error("Couldn't fetch notifications")
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
                    await axiosJWT.post('https://habitbuild-api.onrender.com/server/notification/set-notification', data, {
                    headers: {authorization:'Bearer ' + user.token}
                    })
                })
                // call notification settings?
                console.log("notifications turned on")
            } catch(err) {
                console.error("Couldn't update notification settings")
            }
        }
        else {
            // delete scheduled notifications as notifications have been switched off
            try {
                const ids = notifications.map(n => n._id)
                console.log(ids)

                if(ids.length > 0) {
                    await axiosJWT.delete('https://habitbuild-api.onrender.com/server/notification', {ids: ids}, {
                        headers: {authorization: 'Bearer ' + user.token}
                    })
                    console.log("notification turned off")
                }
            } catch(err) {
                console.error("Couldn't update notifications")
            }
        }

        // update user
        try {
            await axiosJWT.put('https://habitbuild-api.onrender.com/server/user/update', updatedUser, {
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
            await axiosJWT.delete('https://habitbuild-api.onrender.com/server/user', {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"DELETE_USER"})
        } catch (err) {
            console.error("Couldn't delete account")
        }
    }

    return (     
        <EditProfileStyled>
            <Paper className="paper">
                <form className="form" onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={usernameError}
                        helperText={usernameError ? "Username must be between 3-20 characters long" : ""}
                        />
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        helperText={emailError ? "Please enter a valid email" : ""}/>
                    <Button type="submit" variant="contained" id="update-btn">Save</Button>
                </form>

                <form  className="password-form" onSubmit={updatePassword}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Current Password"
                        variant="outlined"
                        margin="normal"
                        value={oldPass || ''}
                        onChange={(e) => setOldPass(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="New Password"
                        variant="outlined"
                        margin="normal"
                        value={newPass || ''}
                        onChange={(e) => setNewPass(e.target.value)}
                        error={passLength}
                        helperText={passLength ? "Password must contain at leasr six characters" : ""}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm New Password"
                        variant="outlined"
                        margin="normal"
                        value={confirmPass || ''}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        error={passError}
                        helperText={passError ? "Passwords don't match" : ""}
                    />
                    <Button type="submit" variant="contained">Update Password</Button>
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
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon/>}
                        onClick={() => setOpenAlert(true)}>
                        Delete Account
                    </Button>

                    <Dialog
                        open={openAlert}
                        onClose={() => setOpenAlert(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to delete your account?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This action can't be undone
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenAlert(false)}>No</Button>
                            <Button onClick={deleteAccount} autoFocus>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Paper>
        </EditProfileStyled>
    )
}