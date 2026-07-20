import axios from "axios"

const API_BASE = "http://localhost:3000/api/v1/auth"

export async function register({username, email, password}) {
    try {
        const response = await axios.post(
            `${API_BASE}/signup`,
            { username, email, password },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.log("error in register", error.response?.data || error.message)
        throw error
    }
}

export async function login({email, password}) {
    try {
        const response = await axios.post(
            `${API_BASE}/login`,
            { email, password },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.log("error in login the user", error.response?.data || error.message)
        throw error
    }
}
export async function logout() {
    try {
        const response = await axios.post(`${API_BASE}/logout`, {}, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log("error in logout the user", error.response?.data || error.message)
        throw error
    }
}
export async function getme() {
    try {
        const response=await axios.get(`${API_BASE}/getme`, {
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log("error in getme", error.response?.data || error.message)
        throw error
    }
}
