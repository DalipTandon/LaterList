import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://dalipdev20:v04sfhgeh0w3zp2M@dev-tinder.qi8sm.mongodb.net/LaterList")
}