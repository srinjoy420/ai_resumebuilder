import mongoose from "mongoose"
import InterviweReportModel from "../model/interviewreport.model.js"
import { generateIntervieweReport, generateResumePdf } from "../services/ai.service.js"
import { PDFParse } from "pdf-parse"

async function parsePdf(buffer) {
    const parser = new PDFParse({ data: buffer })
    try {
        return await parser.getText()
    } finally {
        await parser.destroy()
    }
}

export const genertateInterviewReport = async (req, res) => {
    try {
        const resumeFile = req.file
        if (!resumeFile) {
            return res.status(400).json({ message: "Resume File Required" })
        }

        const parsedPdf = await parsePdf(resumeFile.buffer)
        const resumeText = parsedPdf.text

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ message: "Could not extract text from PDF. Please upload a valid resume." })
        }

        const { selfDescription, jobDecsription } = req.body

        if (!selfDescription || !jobDecsription) {
            return res.status(400).json({ message: "selfDescription and jobDecsription are required" })
        }

        const interVierReportByAI = await generateIntervieweReport({
            resume: resumeText,
            selfDescription,
            jobDecsription
        })

        const interViewReport = await InterviweReportModel.create({
            user: req.user._id,
            resume: resumeText,
            selfDescription,
            jobDecsription,
            ...interVierReportByAI
        })

        res.status(201).json({
            message: "interview Report Generated Successfully",
            report: interViewReport
        })

    } catch (error) {
        console.log("there is a problem in generating the report", error)
        res.status(500).json({
            message: "interview report generation failed",
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        })
    }
}

export const getInterviewreportByid = async (req, res) => {
    const { interviewId } = req.params
    try {
        if (!interviewId) {
            return res.status(400).json({ message: "interview report id is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({ message: "please provide a valid interview id" })
        }
        const report = await InterviweReportModel.findById(interviewId)
        if (!report) {
            return res.status(404).json({ message: "interview report not found" })
        }
        res.status(200).json({ message: "interview report fetched successfully", report })
    } catch (error) {
        console.log("there is a problem in fetching the report", error)
        res.status(500).json({ message: "interview report fetching failed" })
    }
}

export const getAllInterviewReports = async (req, res) => {
    try {
        const reports = await InterviweReportModel.find({ user: req.user._id })
            .select("-resume -selfDescription -__v -createdAt -updatedAt -technicalQuestions -behavioralQuestions -skillGap -preparationPlan -matchScore")
        res.status(200).json({ message: "interview reports fetched successfully", reports })
    } catch (error) {
        console.log("there is a problem in fetching the reports", error)
        res.status(500).json({ message: "interview reports fetching failed" })
    }
}

export const generatResumeePdf = async (req, res) => {
    try {
        const { interviewReportId } = req.params
        if (!interviewReportId) {
            return res.status(400).json({ message: "interviewreport id is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(interviewReportId)) {
            return res.status(400).json({ message: "please provide a valid interview report id" })
        }

        const interviewReport = await InterviweReportModel.findById(interviewReportId)
        if (!interviewReport) {
            return res.status(404).json({ message: "interview report not found" })
        }

        const { resume, jobDecsription, selfDescription } = interviewReport
        const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDecsription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="resume_${interviewReportId}.pdf"`
        })
        res.send(pdfBuffer)

    } catch (error) {
        console.log("the pdf generation error", error)
        res.status(500).json({
            message: "Internal server error the pdf generation Problem",
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        })
    }
}

export const deleteInterviewReport = async (req, res) => {
    try {
        const { interviewId } = req.params
        if (!interviewId) {
            return res.status(400).json({ message: "interview report id is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({ message: "please provide a valid interview id" })
        }
        const deleteReport = await InterviweReportModel.findOneAndDelete({
            _id: interviewId,
            user: req.user._id
        })
        if (!deleteReport) {
            return res.status(404).json({ message: "report not found or unauthorized" })
        }
        res.status(200).json({ message: "interview Report deleted successfully" })
    } catch (error) {
        console.log("there is a problem in deleting the report", error)
        res.status(500).json({ message: "interview report deletion failed" })
    }
}