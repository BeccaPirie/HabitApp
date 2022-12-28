import mongoose from "mongoose"
import HabitDays from "./HabitDays.js"
import Calendar from "./Calendar.js"

// habit details
const HabitSchema = new mongoose.Schema({
    // habit id
    id:{
        type:String,
        required: true,
        unique:true
    },

    // habit name
    name:{
        type:String,
        required: true
    },

    // event cues
    eventCues:{
        type:String,
        required: true
    },

    // days to complete habit
    daystoComplete:[[HabitDays]],

    // completed/missed/skipped each day
    calendarData:[[Calendar]],

    // frequency of notifications
    notificationFrequency: {
        type:Number,
        default:1,
        required:true
    },

    // how many days in a row completed
    DaysCompleted:{
        type:Number,
        default:0,
        required:true
    },

    // how many days in a row not completed
    DaysMissed:{
        type:Number,
        default:0,
        required:true
    },

    // journal notes
    journal: {
        type:String
    },

    // actions that may prevent habit
    preventingActions: {
        type:String
    },

    // what can be done to prevent these actions
    intentions: {
        type:String
    },

    // habit completed
    habitCompleted:{
        type:Boolean,
        default:false,
        required:true
    }
})

export default mongoose.model("Habit", HabitSchema)