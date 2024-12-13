import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://karekezifiston33:karasira@cluster0.08ojd.mongodb.net/e-commerce").then(()=>console.log("DB Connected"));
}