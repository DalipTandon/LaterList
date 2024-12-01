import express, { Request, Response } from "express";
import { contentModel } from "../models/content";
import { userAuthentication } from "../middlewares/userAuth";
const contentRouter=express.Router();


contentRouter.post("/v1/content" ,userAuthentication,(req:Request,res:Response)=>{
    try{
        res.send("endpoint hit")


    }catch(error:any){
        res.status(400).json({
            message:error.message
        })
    }
})






export default contentRouter;