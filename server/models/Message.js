import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    habitId: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default MessageSchema