import HabitList from "./HabitList"

export default function NoSelection({lg}){
    return(
        lg ?
        <div>Select a habit or add a new one</div>
        : <HabitList />
    )
}