export default function Habit({habit}) {
    return(
        <>
            <div>Habit Component</div>

            <button>{habit.habitCompleted ? "Mark habit as incomplete" : "Mark habit as complete"}</button>

            <div>{habit.name}</div>
            <div>{habit.journal}</div>
        </>
    )
}