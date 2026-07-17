import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken
        console.log("token found", token ? "yes" : "no");

        if (!token) {
            return res.status(400).json({ message: "invalid token or token not found" })
        }
        const decode = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log("no token found succesfully failour",error);
        res.status(401).json("middlware failour")

    }


}
