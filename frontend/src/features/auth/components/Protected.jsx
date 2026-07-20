import { useAuth } from "../hooks/useauth";
import {Loader} from "lucide-react"

import React from 'react'
import { Navigate } from "react-router";

const Protected = ({children}) => {
    const {loading,user}=useAuth()
    
    if(loading){
        return <Loader/>
    }
    if(!user){
        return <Navigate to={'/login'}/>
    }
    return children
}

export default Protected