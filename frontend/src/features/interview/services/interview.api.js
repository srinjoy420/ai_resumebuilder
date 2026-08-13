import axios from "axios";

const API_BASE = "http://localhost:3000/api/v1/interview";

export async function genertateInterviewReport({
    resumeFile,
    selfDescription,
    jobDecsription,
}) {
    try {
        const formData = new FormData();

        formData.append("resume", resumeFile);
        formData.append("selfDescription", selfDescription);
        formData.append("jobDecsription", jobDecsription);

        const res = await axios.post(`${API_BASE}/`, formData, {
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
}

export async function getInterviewReportById(interviewId) {
    try {
        const res = await axios.get(`${API_BASE}/${interviewId}`, {
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching interview report by ID:", error);
        throw error;
    }
}

export async function getAllInterviewReports() {
    try {
        const res = await axios.get(`${API_BASE}/`, {
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching all interview reports:", error);
        throw error;
    }
}

export async function generateResumePdf(interviewReportId) {
    try {
        const res = await axios.post(
            `${API_BASE}/resume/pdf/${interviewReportId}`,
            {},
            {
                withCredentials: true,
                responseType: "blob",
            }
        );

        // Convert response to Blob
        const blob = new Blob([res.data], {
            type: "application/pdf",
        });

        // Create temporary URL
        const url = window.URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement("a");

        link.href = url;
        link.download = `resume_${interviewReportId}.pdf`;

        // Add to DOM and click
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error("Resume PDF generation failed:", error);
        throw error;
    }
}