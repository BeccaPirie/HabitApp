export default function HabitList({habits, handleHabitClick}) {
    return(
        <div>
            {habits.map((habit) => (
                <div key={habit.id} onClick={() => handleHabitClick(habit.id)}>
                    {habit.name}
                </div>
            ))}
        </div>
    )
}