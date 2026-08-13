import { InterviewContext } from "../style/interview.context";
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { genertateInterviewReport, getAllInterviewReports, getInterviewReportById,generateResumePdf } from "../services/interview.api.js";

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId: routeInterviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { report, setReport, loading, setLoading, reports, setReports } = context

    const handleGenerateReport = async ({ resumeFile, selfDescription, jobDecsription }) => {
        setLoading(true)
        let data = null
        try {
            data = await genertateInterviewReport({ resumeFile, selfDescription, jobDecsription })
            setReport(data.report)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
        return data?.report
    }

    const generateReport = async (idOrPayload) => {
        setLoading(true)
        let data = null
        try {
            const requestedId = typeof idOrPayload === 'string'
                ? idOrPayload
                : idOrPayload?.interviewId || routeInterviewId

            if (!requestedId) {
                throw new Error("interviewId is required")
            }

            data = await getInterviewReportById(requestedId)
            setReport(data.report)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
        return data?.report
    }

    const fetchAllReports = async () => {
        setLoading(true)
        let data = null
        try {
            data = await getAllInterviewReports()
            setReports(data.reports)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
        return data?.reports
    }
    const geenerateResumePdf = async (interviewReportId) => {
    setLoading(true);

    try {
        if (!interviewReportId) {
            throw new Error("interviewReportId is required");
        }

        await generateResumePdfApi(interviewReportId);

    } catch (error) {
        console.error("Failed to generate resume PDF:", error);
        throw error;
    } finally {
        setLoading(false);
    }
};

    return {
        report,
        loading,
        reports,
        handleGenerateReport,
        generateReport,
        fetchAllReports,
        geenerateResumePdf
    }
}

