import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getme } from "../services/auth.api.js";



export const useAuth=()=>{
    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context

    const handleLogin=async({email,password})=>{
        try {
            setLoading(true)
            const data=await login({email,password})
            setUser(data.user)
            console.log(data.user);
            
           
        } catch (error) {
            console.log(error);
            setUser(null)
            
            
        }
        finally{
            setLoading(false)
        }
    }
    const handleregister=async({username,email,password})=>{
        try {
            setLoading(true)
            const data=await register({username,email,password})
            setUser(data.user)
            console.log(data.user);
            
        } catch (error) {
            console.log(error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    const handleLogout=async()=>{
        try {
            setLoading(true)
            await logout()
            setUser(null)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {user,loading,handleLogin,handleregister,handleLogout}
}