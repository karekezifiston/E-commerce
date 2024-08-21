import React from 'react'
import '../Pages/Login.css'

const Login = () => {
  return (
    <div className='login'>
       <div className='login-container'>
        <h1>Sign Up</h1>
        <div className='login-fields'>
           <input type="text" placeholder='Your Name' />
           <input type="email" placeholder='Email Address' />
           <input type="Password" placeholder='Password' />
        </div>
         <button className='btn-login'>Continue</button>
         <p className="login-login">Already have an account?
          <span>Login Here</span></p>
          <div className='login-agree'>
            <input type='checkbox' name='' id='' />
            <p>By continuing, i agree to use the terms of us & privacy policy.</p>
          </div>
       </div>
    </div>
  )
}

export default Login;
