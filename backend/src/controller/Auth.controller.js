import User from "../model/User.model.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
};
export const generateAccessandRefreshToken = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error("User not found")
    }
    try {
        const accessToken = await user.generateAccestoken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    }
    catch (error) {
        console.error("Error generating tokens:", error);

    }
}

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }
        const user = await User.create({ username, email, password })
        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)
        const createdUser = await User.findById(user._id).select("-password -refreshToken")
        res.cookie("refreshToken", refreshToken, cookieOptions)
        res.cookie("accessToken", accessToken, cookieOptions)
        res.status(201).json({ message: "user created successfully", user: createdUser })

    }
    catch (error) {
        console.log("Failed to register", error)
        return res.status(500).json({ message: "Registration failed, please try again" })

    }
}

export const LoginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "the user not found" })
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "password not match" })
        }
        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
        res.cookie("refreshToken", refreshToken, cookieOptions)
        res.cookie("accessToken", accessToken, cookieOptions)
        res.status(201).json({ message: "user loggedin successfully", user: loggedInUser })




    }
    catch (error) {
        console.log("there was a problem in loggedin", error);
        res.status(400).json({ message: " the user cant loggedin" })
    }
}
export const logOutUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(
            req.user._id,
            {$unset:{refreshToken:1}},
            {new:true}
        )
         res.clearCookie("accessToken", cookieOptions)
        res.clearCookie("refreshToken", cookieOptions)
         return res.status(200).json({ message: "Logged out successfully" })

    } catch (error) {
        console.log("problem in loggingout", error);
        throw new ApiError(404, "something went wrong")
    }
}

export const getme=async (req,res)=>{
    try {
        const user=await User.findById(req.user._id).select("-password -refreshToken")
        if(!user){
             return res.status(404).json({ message: "User not found" })
        }
         return res.status(200).json({ message: "User fetched successfully", user })
    } catch (error) {
         console.log("Error fetching user", error)
        return res.status(500).json({ message: "Failed to fetch user" })
    }
}