import  express from "express"
import mongoose   from "mongoose"
import { userModel } from "./models/user"
import { connectDB } from "./config/db"
import userRouter from "./routes/user"
import contentRouter from "./routes/content"
import shareRouter from "./routes/share"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/user",userRouter);
app.use("/content",contentRouter);
app.use("/brain",shareRouter);

connectDB().then(()=>{
    console.log("DB is connected successfully");   
    app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
})})
.catch((err)=>{
    console.log("DB is not connected successfully");
    
})