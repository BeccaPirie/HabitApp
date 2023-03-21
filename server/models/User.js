import mongoose from "mongoose"
import MessageSchema from "./Message.js"

// user details
const UserSchema = new mongoose.Schema({
    // username
    username:{
        type:String,
        required: true,
        min:3,
        max: 20,
        unique:true
    },

    // user email
    email:{
        type:String,
        required:true,
        max:50,
        unique: true
    },

    // user password
    password:{
        type:String,
        required: true,
        min:6
    },

    token:{
        type:String,
        default: ''
    },

    refreshToken:{
        type:String,
        default: ''
    },

    firebaseToken:{
        type:Array,
        default: []
    },

    messages: [MessageSchema]
})

export default mongoose.model("User", UserSchema)