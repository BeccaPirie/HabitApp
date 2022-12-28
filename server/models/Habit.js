import mongoose from "mongoose"
import HabitDays from "./HabitDays.js"
import Calendar from "./Calendar.js"

// habit details
const HabitSchema = new mongoose.Schema({
    // habit id
    id:{
        type:String,
        require: true,
        unique:true
    },

    // habit name
    name:{
        type:String,
        require: true
    },

    // event cues
    eventCues:{
        type:String,
        require: true
    },

    // days to complete habit
    daystoComplete:[[HabitDays]],

    // completed/missed/skipped each day
    daysCompleted:[[Calendar]],

    // frequency of notifications
    notificationFrequency: {
        type:Number,
        default:1
    },

    // how many days in a row compelted
    consecutiveDaysCompleted:{
        type:Number,
        default:0
    },

    // how many days in a row not completed
    consecutiveDaysMissed:{
        type:Number,
        default:0
    },

    // journal notes
    journalNotes: {
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