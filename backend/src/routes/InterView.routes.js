import {Router} from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/file.middleware.js"
import { genertateInterviewReport } from "../controller/Interview.controller.js"




const ineterViewRouter=Router()
ineterViewRouter.post("/", isLoggedIn, upload, genertateInterviewReport)

export default ineterViewRouter