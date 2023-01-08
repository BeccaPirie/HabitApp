import { Link } from "react-router-dom"
import { StyledSidebar } from "./styles/Sidebar.styled"

export default function Sidebar() {
    
    return(
        <StyledSidebar>
        <ul>
            <Link to={'/'}>
                <li>Home</li>
            </Link>
            <Link to={'/'}>
                <li>Analytics</li>
            </Link>
            <Link to={'/'}>
                <li>About</li>
            </Link>
            <Link to={'/'}>
                <li>Profile</li>
            </Link>
            <Link to={'/'}>
                <li>Settings</li>
            </Link>
        </ul>
        </StyledSidebar>
    )        
}