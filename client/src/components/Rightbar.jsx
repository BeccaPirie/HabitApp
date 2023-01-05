import { StyledRightbar } from "./styles/Rightbar.styled"

export default function Rightbar() {
    const dayOfWeek = new Date().toLocaleString(
        'default', {weekday: 'long'}
    )

    return(
        <StyledRightbar>
            <div>Have you completed these habits today?</div>
        </StyledRightbar>
    )
}