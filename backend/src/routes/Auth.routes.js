import {Router} from "express"
import { LoginUser, logOutUser, registerUser } from "../controller/Auth.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"
const authRouter=Router()
authRouter.post("/singup",registerUser)
authRouter.post("/login",LoginUser)
authRouter.post("/logout",isLoggedIn,logOutUser)
export default authRouter