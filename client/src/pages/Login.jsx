import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/user/UserContext'
import { PageContainer } from '../components/styles/PageContainer.styled'
import { LoginStyled } from '../components/styles/Login.styled'
import LoginPageImage from '../images/healthy-habits.avif'
import { ImageStyled } from '../components/styles/Image.styled'
import { Link } from "react-router-dom"
import { TextField, Button } from '@mui/material'

export default function Login() {
    const { dispatch } = useContext(UserContext)
    const [error, setError] = useState(false)
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userCredentials = {
            email: email,
            password: password
        }
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", userCredentials)
            dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
            setError(false)
        }
        catch(err) {
            dispatch({ type:"LOGIN_FAILURE", payload: err });
            console.error(err.response.data)
            setError(true)
        }
    }
    return(
        <PageContainer style={{backgroundColor: "#fff"}}>
            <ImageStyled src={LoginPageImage}/>

            <LoginStyled>
                <form onSubmit={handleSubmit}>
                    <h3>HabitBuild</h3>
                    <TextField
                        type="email"
                        required
                        error={error}
                        placeholder="Email"
                        className="loginInput"
                        value={email || ''}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="password"
                        required
                        error={error}
                        minLength="6"
                        placeholder="Password"
                        className="loginInput"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={error ? "Username or password is incorrect" : ""}
                        fullWidth
                    />
                    <Button type="submit" className="submit-btn">Login</Button>

                    <div>
                       <span>Don't have an account? </span>
                        <Link to={'/signup'}><span>Sign up</span></Link> 
                    </div>
                    
                </form>
            </LoginStyled>
        </PageContainer>
    )
}