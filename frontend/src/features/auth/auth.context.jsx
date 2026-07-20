import {createContext,useState,useEffect} from "react"
import { getme } from "./services/auth.api.js"

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getAndsetUser=async()=>{
            try {
                const data=await getme()
                setUser(data.user)
            } catch (error) {
                console.log("getme failed", error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getAndsetUser()
    },[])


    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}