import { useRef, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/user/UserContext'
import { PageContainer } from '../components/styles/PageContainer.styled'
import { LoginStyled } from '../components/styles/Login.styled'
import LoginPageImage from '../images/healthy-habits.avif'
import { ImageStyled } from '../components/styles/Image.styled'
import { Link } from "react-router-dom"

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { dispatch } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userCredentials = {
            email: email.current.value,
            password: password.current.value
        }
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:5000/server/auth/login", userCredentials)
            dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
        }
        catch(err) {
            dispatch({ type:"LOGIN_FAILURE", payload: err });
            console.error(err.response.data)
        }
    }
    return(
        <PageContainer>
            <ImageStyled src={LoginPageImage}/>

            <LoginStyled>
                <form onSubmit={handleSubmit}>
                    <h3>Habit App</h3>
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="loginInput"
                        ref={email}
                    />
                    <input
                        type="password"
                        required
                        minLength="6"
                        placeholder="Password"
                        className="loginInput"
                        ref={password}
                    />
                    <button>Login</button>

                    <div>
                       <span>Don't have an account? </span>
                        <Link to={'/signup'}><span>Sign up</span></Link> 
                    </div>
                    
                </form>
            </LoginStyled>
        </PageContainer>
    )
}