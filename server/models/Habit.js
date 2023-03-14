import mongoose from "mongoose"
import HabitDaysSchema from "./HabitDays.js"
import CalendarSchema from "./Calendar.js"
import TodoSchema from "./Todo.js"

// habit details
const HabitSchema = new mongoose.Schema({
    // user id
    userId:{
        type:String,
        required: true,
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
    daysToComplete:[HabitDaysSchema],

    // completed/missed/skipped each day
    calendarData:[CalendarSchema],

    // frequency of notifications
    notificationFrequency: {
        type:Number,
        default:1,
        required:true
    },

    // how many days in a row completed
    daysCompleted:{
        type:Number,
        default:0,
        required:true
    },

    // how many days in a row not completed
    daysMissed:{
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
    },

    // todos
    todos: [TodoSchema]
},
{timestamps: true})

export default mongoose.model("Habit", HabitSchema)