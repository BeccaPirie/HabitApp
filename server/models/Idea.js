import mongoose from "mongoose"

const IdeaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('Idea', IdeaSchema)