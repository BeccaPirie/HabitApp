import mongoose from "mongoose"

// days of the week habit is to be carried out
const HabitDaysSchema = new Schema({
    // day of the week
    dayOfWeek: {
        type:String,
        enum: ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    
    // whether habit should be carried out
    toComplete: {
        type:Boolean,
        default:true
    }
})

export default mongoose.model('HabitDays', HabitDaysSchema)