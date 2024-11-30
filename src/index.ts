import  express from "express"
import mongoose   from "mongoose"
import { userModel } from "./models/user"
import { connectDB } from "./config/db"
import userRouter from "./routes/user"
import cookieParser from "cookie-parser"
const app=express()

app.use(cookieParser())
app.use(express.json())

app.use("/user",userRouter);

connectDB().then(()=>{
    console.log("DB is connected successfully");   
    app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
})})
.catch((err)=>{
    console.log("DB is not connected successfully");
    
})