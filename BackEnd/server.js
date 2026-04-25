import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
dotenv.config()
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookieParser)
app.use(cors({origin:"http://localhost:5173", credentials: true}))

app.use("/api/auth", authRoutes)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    connectDB()
    console.log("Server is runing an port 3000")
})