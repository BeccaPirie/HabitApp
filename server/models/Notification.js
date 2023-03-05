import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
    notification: {
        type: Object,
        required: true
    },
    days: {
        type: Array,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

export default mongoose.model("Notification", NotificationSchema)