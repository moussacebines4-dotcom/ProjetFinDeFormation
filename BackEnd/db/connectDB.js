import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MoongoDB")
        
    } catch (error) {
        console.error("Erreur connecting to MongoDb")
        process.exit(1)
        
    }
}