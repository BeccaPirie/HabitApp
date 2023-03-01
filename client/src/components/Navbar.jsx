import { StyledNavbar } from "./styles/Navbar.styled"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from '../context/user/UserContext'

export default function Navbar() {
    const { user } = useContext(UserContext)

    return(
        <StyledNavbar>
            <div className="left">
                <h2>Welcome back {user.username}!</h2>
            </div>
            
            <div className="right">  
                <ul>
                    <Link to="/">
                        <li>About</li>
                    </Link>
                    <Link to="/">
                        <li>Profile</li>
                    </Link>
                </ul>
            </div>
        </StyledNavbar>
    )
}