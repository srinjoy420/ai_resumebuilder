import axios from "axios"

const API_BASE = "http://localhost:3000/api/v1/interview"

export async function genertateInterviewReport({resumeFile, selfDescription, jobDecsription}) {
    try {
        const formData = new FormData()
        formData.append("resume", resumeFile)
        formData.append("selfDescription", selfDescription)
        formData.append("jobDecsription", jobDecsription)

        const res = await axios.post(`${API_BASE}/`, formData, {
            withCredentials: true
        })

        return res.data
    } catch (error) {
        console.error("error generating interview report", error)
        throw error
    }
}
export async function getInterviewReportById(interviewId) {
    try {
        const res = await axios.get(`${API_BASE}/${interviewId}`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.error("error fetching interview report by id", error)
        throw error
    }   
}
export async function getAllInterviewReports() {
    try {
        const res = await axios.get(`${API_BASE}/`, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.error("error fetching all interview reports", error)
        throw error
    }
}