import { useRef, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/user/UserContext'

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
            console.log(JSON.stringify(res.data.refreshToken));
            dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
        }
        catch(err) {
            dispatch({ type:"LOGIN_FAILURE", payload: err });
            console.error(err.response.data)
        }
    }
    return(
        <div>
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
            </form>
        </div>
    )
}