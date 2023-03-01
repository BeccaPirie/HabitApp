import { AlertStyled } from "./styles/Alert.styled"

export default function Alert({message}) {
    return(
        <AlertStyled>{message}</AlertStyled>
    )
}