import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },

    isComplete: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default TodoSchema