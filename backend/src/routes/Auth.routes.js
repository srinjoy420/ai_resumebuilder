import {Router} from "express"
import { getme, LoginUser, logOutUser, registerUser } from "../controller/Auth.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"
const authRouter=Router()
authRouter.post("/signup",registerUser)
authRouter.post("/login",LoginUser)
authRouter.post("/logout",isLoggedIn,logOutUser)
authRouter.get("/getme",isLoggedIn,getme)
export default authRouter