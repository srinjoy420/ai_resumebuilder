import axios from "axios"

export async function register(username,email,password){
   try {
    const response=await axios.post(`http://localhost:3000/api/v1/auth/singup`,{
        username,email,password
    },{
        withCredentials:true
    })
    return response.data
   } catch (error) {
    console.log("error in regsiter",register);
    
   }
}

export async function login(email,password){
    try {
        const response=await axios.post(`http://localhost:3000/api/v1/auth/login`,{
            email,password
        },{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log("error in login the user",error);
        
        
    }
}
export async function logout() {
    try {
        const response=await axios.post("http://localhost:3000/api/v1/auth/logout",{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log("error in logout the user",error);
        
    }
    
}
export async function getme() {
    try {
        const response=await axios.get("http://localhost:3000/api/v1/auth/getme",{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log("error in getme",error);

        
        
    }
    
}