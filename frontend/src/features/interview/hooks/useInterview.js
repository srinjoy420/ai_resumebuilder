import { InterviewContext } from "../style/interview.context";
import { useContext } from "react";
import { useParams } from "react-router";

import {
    genertateInterviewReport,
    getAllInterviewReports,
    getInterviewReportById,
    generateResumePdf as generateResumePdfApi,
    deleteInterviewReport
} from "../services/interview.api.js";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    const { interviewId: routeInterviewId } = useParams();

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        report,
        setReport,
        loading,
        setLoading,
        reports,
        setReports,
    } = context;

    // -----------------------------------------
    // Generate Interview Report
    // -----------------------------------------
    const handleGenerateReport = async ({
        resumeFile,
        selfDescription,
        jobDecsription,
    }) => {
        setLoading(true);

        let data = null;

        try {
            data = await genertateInterviewReport({
                resumeFile,
                selfDescription,
                jobDecsription,
            });

            setReport(data.report);
        } catch (error) {
            console.error("Failed to generate interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }

        return data?.report;
    };

    // -----------------------------------------
    // Get Single Interview Report
    // -----------------------------------------
    const generateReport = async (idOrPayload) => {
        setLoading(true);

        let data = null;

        try {
            const requestedId =
                typeof idOrPayload === "string"
                    ? idOrPayload
                    : idOrPayload?.interviewId || routeInterviewId;

            if (!requestedId) {
                throw new Error("interviewId is required");
            }

            data = await getInterviewReportById(requestedId);

            setReport(data.report);
        } catch (error) {
            console.error("Failed to fetch interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }

        return data?.report;
    };
    // handle delete report
    const handelDeleteReport=async(interviewId)=>{
        try {
            await deleteInterviewReport(interviewId)
            setReports((prev) => (prev || []).filter((item) => item._id !== interviewId))
            if (report?._id === interviewId) {
                setReport(null)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // -----------------------------------------
    // Get All Interview Reports
    // -----------------------------------------
    const fetchAllReports = async () => {
        setLoading(true);

        let data = null;

        try {
            data = await getAllInterviewReports();

            setReports(data.reports);
        } catch (error) {
            console.error("Failed to fetch interview reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }

        return data?.reports;
    };

    // -----------------------------------------
    // Generate / Download Resume PDF
    // -----------------------------------------
    const generateResumePdf = async (interviewReportId) => {
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
        generateResumePdf,
        handelDeleteReport
    };
};