import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB=async()=>{
     try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connect to succesfully");
        
    } catch (error) {
        console.log("error to connected the database");
        process.exit(1)
        
        
    }
}
export default connectDB