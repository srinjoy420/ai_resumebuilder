import InterviweReportModel from "../model/interviewreport.model.js";

import { generateIntervieweReport } from "../services/ai.service.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");
// console.log(pdfParse);
// console.log(typeof pdfParse);


export const genertateInterviewReport=async(req,res)=>{
    try {
        const resumeFile=req.file
        if(!resumeFile){
            return res.status(400).json({ message: "Resume File Required" })
        }
    // const parsePdf=await pdfParse(resumeFile.buffer)
    const resumeContent=await(new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDecsription}=req.body

    const interVierReportByAI = await generateIntervieweReport({
        resume: resumeContent.text,
        selfDescription,
        jobDecsription
    })

    const interViewReport = await InterviweReportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        selfDescription,
        jobDecsription,
        ...interVierReportByAI
    })
    res.status(201).json({ message: "interview Report Generated Succesfully", report: interViewReport })
    } catch (error) {
        console.log("there is a problem in generating the report",error);
        res.status(500).json({message:"interview report generation failed"})
        
        
    }
}

export const getInterviewreportByid=async(req,res)=>{
    const {interviewId}=req.params
    try{
        if(!interviewId){
            return res.status(404).json({message:"interview report id is required"})
        }
        const report = await InterviweReportModel.findById(interviewId)
        res.status(200).json({ message: "interview report fetched successfully", report })
    }
    catch(error){
        console.log("there is a problem in fetching the report",error);
        res.status(500).json({message:"interview report fetching failed"})
    }
}
export const getAllInterviewReports=async(req,res)=>{
    try{
        const reports = await InterviweReportModel.find({ user: req.user._id }).select("-resume -selfDescription -__v -createdAt -updatedAt -technicalQuestions -behavioralQuestions -skillGap -preparationPlan -matchScore")
        res.status(200).json({ message: "interview reports fetched successfully", reports })
    }
    catch(error){
        console.log("there is a problem in fetching the reports",error);
        res.status(500).json({message:"interview reports fetching failed"})
    }
}