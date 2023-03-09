import { StyledNavbar } from "./styles/Navbar.styled"
import { Link } from "react-router-dom"

export default function Navbar({text}) {
    return(
        <StyledNavbar>
            <div className="left">
                <h2>{text}</h2>
            </div>
            
            <div className="right">  
                <ul>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/profile">
                        <li>Profile</li>
                    </Link>
                </ul>
            </div>
        </StyledNavbar>
    )
}