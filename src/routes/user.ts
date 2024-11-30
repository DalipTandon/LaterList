import express, { Request, Response } from "express";
import { userModel } from "../models/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv';
dotenv.config();
 const userRouter=express.Router()
 
 userRouter.post("/v1/signup",async(req:Request,res:Response)=>{
    try{
       
        const { userName, password } = req.body;
    
    const isExist=await userModel.findOne({
        userName
    })
    if(isExist){
       throw new Error("User with this name already exists")
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        userName,password:hashedPassword
    })
    user.save();
    res.status(200).json({
        message:"Signup successfull",
        data:user
    })
    }catch (error: any) {
        res.status(500).json({
            error:error.message
        })
      }
       });


userRouter.post("/v1/signin",async(req:Request,res:Response)=>{
    try{
        const {userName,password}=req.body;

         const user=await userModel.findOne({
            userName
         })
         if(!user){
            throw new Error("Invalid username");
         }
         const isValid=await bcrypt.compare(password,user.password);
         if(!isValid){
            throw new Error("Invalid password");
         }else{
            var token=await jwt.sign({_id:user._id},process.env.USER_SECREAT as string,{expiresIn:"4d"});
            res.cookie("token",token);
            res.status(200).json({
                message:"User successfully signedin"
            })
         }

    }catch(error:any){
        res.status(400).send("Error: "+error.message);
    }
})
 export default userRouter;