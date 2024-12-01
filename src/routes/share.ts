import express,{Request,Response} from "express"
const shareRouter=express.Router();
import { userAuthentication } from "../middlewares/userAuth";
import { random } from "../config/util";
import { linkModel } from "../models/content";
import { contentModel } from "../models/content";
import { userModel } from "../models/user";

shareRouter.post("/v1/share",userAuthentication,async(req:Request,res:Response):Promise<any>=>{
    try{
        const {share}=req.body;
        if(share){
            const existingLink=await linkModel.findOne({
                userId:req.user._id
            });
            if(existingLink){
            return    res.json({ hash: existingLink.hash });
            }
                const hash=random(15);
                await linkModel.create({
                    hash,
                    userId:req.user._id
                })
         return   res.json({
                hash
            })
        }else{
            await linkModel.deleteOne({
                userId:req.user._id
            })
          return  res.json({
                message:"Link removed successfully"
            })
        }

    }catch(error:any){
        res.status(400).json({
            message:"Error: "+error.message
        })
    }
})


shareRouter.get("/v1/read/:shareLink",userAuthentication,async(req:Request,res:Response)=>{
    try{
        const shareLink=req.params.shareLink;

        const link=await linkModel.findOne({
            hash:shareLink
        })

        if(!link){
            throw new Error("Invalid link!!")
        }
        const content=await contentModel.find(
            {
                userId:link.userId
            }
        )

        const user=await userModel.findOne({
            _id:link.userId
        })
        if(!user){
            throw new Error("USer not found");
        }

        res.status(200).json({
            username:user.userName,
            content:content
        })

    }catch(error:any){
        res.status(400).json({
            message:"Error : "+error.message
        })
    }
})




export default shareRouter;