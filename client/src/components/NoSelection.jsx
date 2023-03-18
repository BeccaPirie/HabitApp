import HabitList from "./HabitList"
import { NoSelectionStyled } from "./styles/NoSelection.styled"
import Paper from "@mui/material/Paper"

export default function NoSelection({lg}){
    return(
        lg ?
        <NoSelectionStyled>
            <Paper className="paper">
                <p>
                    Select a habit or add a new one
                </p>
            </Paper>
        </NoSelectionStyled>
            : <HabitList />   
    )
}