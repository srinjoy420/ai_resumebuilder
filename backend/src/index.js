import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import connectDB from "./DB/DB.js"
import authRouter from "./routes/Auth.routes.js"


dotenv.config()
const app = express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT"]
}))
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/v1/auth",authRouter)
connectDB()
app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    
})