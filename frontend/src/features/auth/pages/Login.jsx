import React, { useState } from 'react'
import {Loader} from "lucide-react"
import "../auth.form.scss"
import {useNavigate,Link} from "react-router"
import { useAuth } from '../hooks/useauth.js'


const Login = () => {
   const navigaate=useNavigate()
   const {loading,handleLogin}=useAuth()
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")

  const handelSubmit=async(e)=>{
    
    e.preventDefault()
    handleLogin({email,password})
    navigaate("/")
  }
  if(loading){
    return (
      <Loader/>
    )
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input 
               value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              type='email' name='email' id='email' placeholder='enter your email'
             
              />
              

          </div>
           <div className='input-group'>
              <label htmlFor='password'>password</label>
              <input 
              value={password}
              onChange={(e)=>{setpassword(e.target.value)}}
              type='password' name='password' id='password' placeholder='enter your password'
              />
              

          </div>
          <button className='button primary-button'>Login</button>
        </form>
        <p>Dont have an account?<Link to={"/register"}>register</Link> </p>

      </div>
    </main>
  )
}

export default Login