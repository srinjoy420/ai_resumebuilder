import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
const userschema=new mongoose.Schema({
     username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }

},{timestamps:true})
userschema.pre("save",async function() {
    if(!this.isModified("password")) return
    this.password=await bcrypt.hash(this.password,10)
    
})
userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userschema.methods.generateAccestoken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.ACESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userschema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}
const User=mongoose.model("User",userschema)
export default User