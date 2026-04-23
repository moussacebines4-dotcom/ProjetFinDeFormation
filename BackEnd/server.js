import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
dotenv.config()
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(cookieParser)

app.use("/api/auth", authRoutes)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    connectDB()
    console.log("Server is runing an port 3000")
})