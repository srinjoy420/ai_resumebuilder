import {Router} from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/file.middleware.js"
import { genertateInterviewReport,getInterviewreportByid,getAllInterviewReports,generatResumeePdf } from "../controller/Interview.controller.js"




const ineterViewRouter = Router()
ineterViewRouter.post("/", isLoggedIn, upload, genertateInterviewReport)
ineterViewRouter.get("/", isLoggedIn, getAllInterviewReports)
ineterViewRouter.get("/:interviewId", isLoggedIn, getInterviewreportByid)
ineterViewRouter.post("/resume/pdf/:interviewReportId",isLoggedIn,generatResumeePdf)



export default ineterViewRouter