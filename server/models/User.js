import mongoose from "mongoose"

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
    
    // list of habit ids
    habits:{
        type:Array,
        default:[]
    }
})

export default mongoose.model("User", UserSchema)