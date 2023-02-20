import { useRef } from 'react'
import axios from 'axios'
import{ useNavigate } from 'react-router-dom'

export default function Signup() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                confirmPassword: confirmPassword.current.value
            }
            try {
                const res = await axios.post("http://localhost:5000/server/auth/signup", user)
                navigate('/login')
            } catch(err) {
                console.error(err.response.data)
            }
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Habit App</h3>
                <input
                    required
                    placeholder="Username"
                    className="loginInput"
                    ref={username}
                />
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
                <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    className="loginInput"
                    ref={confirmPassword}
                />
                <button>Sign up</button>
            </form>
        </div>
    )
}