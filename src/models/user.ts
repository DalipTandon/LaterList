import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const userModel=mongoose.model("User",userSchema);
