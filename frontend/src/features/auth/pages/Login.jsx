import React from 'react'
import "../auth.form.scss"
import {useNavigate,Link} from "react-router"

const Login = () => {
   const navigaate=useNavigate()

  const handelSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' placeholder='enter your email'/>
              

          </div>
           <div className='input-group'>
              <label htmlFor='password'>password</label>
              <input type='password' name='password' id='password' placeholder='enter your password'/>
              

          </div>
          <button className='button primary-button'>Login</button>
        </form>
        <p>Dont have an account?<Link to={"/register"}>register</Link> </p>

      </div>
    </main>
  )
}

export default Login