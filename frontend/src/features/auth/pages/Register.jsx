import React, { useState } from 'react'
import {useNavigate,Link} from "react-router"
import {Loader} from "lucide-react"
import { useAuth } from '../hooks/useauth.js'

const Register = () => {
  const {loading,handleregister}=useAuth()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigaate=useNavigate()
  const handelSubmit=(e)=>{
    e.preventDefault()
    handleregister({username,email,password})
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
        <h1>Regsiter</h1>
        <form onSubmit={handelSubmit}>
          <div className='input-group'>
              <label htmlFor='username'>User Name</label>
              <input 
              value={username}
              onChange={(e)=>{setusername(e.target.value)}}
              type='text' name='username' id='username' placeholder='enter your naame'/>
              

          </div>
          <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input 
              value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              type='email' name='email' id='email' placeholder='enter your email'/>
              

          </div>
           <div className='input-group'>
              <label htmlFor='password'>password</label>
              <input 
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              type='password' name='password' id='password' placeholder='enter your password'/>
              

          </div>
          <button className='button primary-button'>Singup</button>
        </form>
        <p>Already have a account?<Link to={"/login"}>login</Link> </p>

      </div>
    </main>
  )
}

export default Register