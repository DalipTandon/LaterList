import express, { Request, Response } from "express";
import { contentModel } from "../models/content";
import { userAuthentication } from "../middlewares/userAuth";
const contentRouter=express.Router();


contentRouter.post("/v1/content" ,userAuthentication,async(req:Request,res:Response)=>{
    try{
      const{type,link,title,tags}=req.body;
      const userId=req.user._id;
      const content=await contentModel.create({
        type,link,tags,title,
        userId
      });

      res.status(200).json({
        message:"Content successfully added"
      })

    }catch(error:any){
        res.status(400).json({
            message:error.message
        })
    }
})

contentRouter.delete("/v1/content/:contentId",userAuthentication,async(req:Request,res:Response)=>{
    try{
        const contentId=req.params.contentId;
        const userId=req.user._id;

        const data=await contentModel.deleteOne({
            _id:contentId,
            userId:userId
        });
        if(data.deletedCount ===0){
            throw new Error("Content not found");
        }
        res.status(200).json({
            message:"Your content is deleted"
        })

    }catch(error:any){
        res.status(400).json({
            message:error.message || "Internal server error"
        })
    }
})





export default contentRouter;