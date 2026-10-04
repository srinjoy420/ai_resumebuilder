import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import connectDB from "./DB/DB.js"
import authRouter from "./routes/Auth.routes.js"
import ineterViewRouter from "./routes/InterView.routes.js"



// import invokeGwminiAI from "./services/ai.service.js"




dotenv.config()
const app = express()
const PORT=process.env.PORT
const allowedOrigins = new Set([
    "http://localhost:5173",
    ...(process.env.FRONTEND_URL || "")
        .split(",")
        .map(origin => origin.trim())
        .filter(Boolean)
])
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://ai-resumebuilder-lbab.vercel.app",
    ];

    const isVercelPreview =
      /^https:\/\/ai-resumebuilder(?:-.*)?\.vercel\.app$/.test(origin || "");

    callback(null, !origin || allowedOrigins.includes(origin) || isVercelPreview);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
}));

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/interview",ineterViewRouter)
connectDB()
// generateIntervieweReport(resume,selfDescription,jobDecsription)
// invokeGwminiAI()
app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    
})