import mongoose from "mongoose"

// days of the week habit is to be carried out
const HabitDaysSchema = new mongoose.Schema({
    // day of the week
    dayOfWeek: {
        type:String,
        enum: ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    
    // whether habit should be carried out
    toComplete: {
        type:Boolean,
        default:true,
        required:true
    }
})

export default HabitDaysSchema