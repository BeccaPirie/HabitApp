import HabitList from "./HabitList"

export default function NoSelection({lg}){
    if(lg) {
        return(
            <div>Select a habit or add a new one</div>
        )
    }
    else {
        return(
            <HabitList />
        )
    }
}