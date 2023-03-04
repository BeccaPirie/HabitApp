import HabitList from "./HabitList"
import { NoSelectionStyled } from "./styles/NoSelection.styled"

export default function NoSelection({lg}){
    return(
        lg ?
        <NoSelectionStyled>
            Select a habit or add a new one
        </NoSelectionStyled>
        : <HabitList />
    )
}