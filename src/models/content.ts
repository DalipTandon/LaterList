import mongoose from "mongoose";
import { userModel } from "./user";

const contentTypes = ['image', 'video', 'article', 'audio']; 

const contentSchema=new mongoose.Schema({
    
    type:{
       type:String,
       required:true   ,
       enum:contentTypes
    },
    link:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:userModel,
        required:true
    }
},{timestamps:true})

export const contentModel=mongoose.model("Content",contentSchema);