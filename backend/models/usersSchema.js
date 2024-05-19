import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        requires : true
    },
    lastName:{
        type : String,
        requires : true
    },
    email:{
        type : String,
        requires : true,
        unique:true
    },
    username:{
        type : String,
        requires : true,
        unique:true
    },
    password:{
        type : String,
        requires : true
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    messages:{
        type:Array,
        default:[]
    },
    bookmarks: {
        type: Array,
        default: []
    }
},{timestamps:true})

export const User= mongoose.model("User",userSchema)