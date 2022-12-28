import mongoose from "mongoose"

// habit calendar
const CalendarSchema = new mongoose.Schema({
    // selected date
    date: {
        type:Date,
        required:true,
        default:Date.now()
    },

    // completed status
    Status: {
        type:String,
        enum: ['Completed', 'Skipped', 'Missed', 'No data'],
        default: 'No data'
    }
})

export default mongoose.model("Calendar", CalendarSchema)