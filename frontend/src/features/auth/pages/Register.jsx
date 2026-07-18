import React from 'react'
import {useNavigate,Link} from "react-router"

const Register = () => {
  const handelSubmit=(e)=>{
    e.preventDefault()
  }
  const navigaate=useNavigate()
  return (
    <main>
      <div className='form-container'>
        <h1>Regsiter</h1>
        <form onSubmit={handelSubmit}>
          <div className='input-group'>
              <label htmlFor='username'>User Name</label>
              <input type='text' name='username' id='username' placeholder='enter your naame'/>
              

          </div>
          <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' placeholder='enter your email'/>
              

          </div>
           <div className='input-group'>
              <label htmlFor='password'>password</label>
              <input type='password' name='password' id='password' placeholder='enter your password'/>
              

          </div>
          <button className='button primary-button'>Singup</button>
        </form>
        <p>Already have a account?<Link to={"/login"}>login</Link> </p>

      </div>
    </main>
  )
}

export default Register