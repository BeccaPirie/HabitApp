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
// edit habit
// delete habit
// mark as complete
// update journal

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