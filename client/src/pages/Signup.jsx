import { useState } from 'react'
import axios from 'axios'
import{ useNavigate, Link } from 'react-router-dom'
import { PageContainer } from '../components/styles/PageContainer.styled'
import { LoginStyled } from '../components/styles/Login.styled'
import LoginPageImage from '../images/healthy-habits.avif'
import { ImageStyled } from '../components/styles/Image.styled'
import { TextField, Button, Alert } from '@mui/material'

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passError, setPassError] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [alertText, setAlertText] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        // client validation
        const checkUsername = username.length < 3 || username.length > 20
        // const checkEmail = !regex.test(email)
        const checkPassLength = password.length < 6
        const checkPassMatch = confirmPassword !== password
        
        // save state for displaying errors on text fields
        setUsernameError(checkUsername)
        // setEmailError(checkEmail)
        setPassLength(checkPassLength)
        setPassError(checkPassMatch)

        // return from function if errors exist
        if(checkUsername || checkPassLength || checkPassMatch) return

        // if no errors, send to server
        const user = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        try {
            await axios.post("/auth/signup", user)
            setAlertText('')
            navigate('/login')
        } catch(err) {
            setAlertText(err.response.data)
        }
    }

    return(
        <PageContainer style={{backgroundColor: "#fff"}}>
            <ImageStyled src={LoginPageImage} />

            <LoginStyled>
                {alertText.length > 0 &&
                    <Alert className="alert" severity="error" onClose={() => {setAlertText('')}}>
                        {alertText}
                    </Alert>}
                
                <form onSubmit={handleSubmit}>
                    <h3>Habit App</h3>
                    <TextField
                        required
                        placeholder="Username"
                        className="loginInput"
                        fullWidth
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                        error={usernameError}
                        helperText={usernameError ? "Username must be between 3-20 characters long" : ""}
                    />
                    <TextField
                        type="email"
                        required
                        placeholder="Email"
                        className="loginInput"
                        fullWidth
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                        // error={emailError}
                        // helperText={emailError ? "Please enter a valid email" : ""}
                    />
                    <TextField
                        type="password"
                        required
                        minLength="6"
                        placeholder="Password"
                        className="loginInput"
                        fullWidth
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passLength}
                        helperText={passLength ? "Password must contain at least six characters" : ""}
                    />
                    <TextField
                        type="password"
                        required
                        placeholder="Confirm Password"
                        className="loginInput"
                        fullWidth
                        value={confirmPassword || ''}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={passError}
                        helperText={passError ? "Passwords don't match" : ""}
                    />
                    <Button type="submit" className="submit-btn">Sign up</Button>

                    <div>
                        <span>Already have an account? </span>
                        <Link to={'/login'}><span>Login</span></Link> 
                    </div>
                </form>
            </LoginStyled>
        </PageContainer>
    )
}