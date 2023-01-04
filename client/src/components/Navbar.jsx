import { Link } from "react-router-dom"
import { StyledNavBar } from "./styles/Navbar.styled"

export default function Navbar() {
    return(
        <StyledNavBar>
            <Link to="/">
                <span>Habit App</span>
            </Link>
        </StyledNavBar>
    )
}