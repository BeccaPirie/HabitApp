// get users habits
export const FetchStart = () => ({
    type: "FETCH_START"
})

export const FetchHabits = (habits) => ({
    type: "FETCH_HABITS",
    payload: habits
})

export const FetchFail = () => ({
    type: "FETCH_FAIL"
})

// add habit
export const AddHabit = (habit) => ({
    type: "ADD_HABIT",
    payload: habit
})

// update habit
export const UpdateHabit = (habit) => ({
    type: "UPDATE_HABIT",
    payload: habit
})

// delete habit
export const DeleteHabit = (habit) => ({
    type: "DELETE_HABIT",
    payload: habit
})

// mark as complete
export const CompleteHabit = (habit) => ({
    type: "COMPLETE_HABIT",
    payload: habit
})

// update journal
export const UpdateJournal = (habit) => ({
    type: "UPDATE_JOURNAL",
    payload: habit
})

// update calendar
export const UpdateCalendar = ( habits ) => ({
    type: "UPDATE_CALENDAR",
    payload: habits
})

// add to calendar
export const AddToCalendar = ( habits ) => ({
    type: "ADD_TO_CALENDAR",
    payload: habits
})

// remove from calendar
export const RemoveFromCalendar = ( habits ) => ({
    type: "REMOVE_FROM_CALENDAR",
    payload: habits
})