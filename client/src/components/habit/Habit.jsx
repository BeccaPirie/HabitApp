export default function Habit({habit}) {
    return(
        <>
            <div>Habit Component</div>
            <div>{habit.name}</div>
            <div>{habit.journal}</div>
        </>
    )
}