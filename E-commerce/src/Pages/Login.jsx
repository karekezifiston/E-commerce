import React, { useState } from 'react'
import '../Pages/Login.css'

const Login = () => {

  const [state,setState]=useState('Login');

  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  } 

  const login =async ()=>{
    console.log('Login Function Executed',formData);
    let responseData;
    await fetch('https://shop-eco-backend.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }


  const signup =async ()=>{
    console.log('SignUp Function Executed',formData);
    let responseData;
    await fetch('https://shop-eco-backend.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='login'>
       <div className='login-container'>
        <h1>{state}</h1>
        <div className='login-fields'>
           {state==='Sign Up'?<input name='username' value={formData.username}
           onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
           <input name='email' value={formData.email}
           onChange={changeHandler} type="email" placeholder='Email Address' />

           <input name='password' value={formData.password}
           onChange={changeHandler} type="Password" placeholder='Password' />

        </div>
         <button onClick={()=>{state==="Login"?login():signup()}} className='btn-login'>Continue</button>
         {state==='Sign Up'?<p className="login-login">Already have an account?
          <span onClick={()=>{setState('Login')}}>Login Here</span></p>
          :<p className="login-login">Create an account
          <span onClick={()=>{setState('Sign Up')}}>Login Here</span></p>}
         
         
          <div className='login-agree'>
            <input type='checkbox' name='' id='' />
            <p>By continuing, i agree to use the terms of us & privacy policy.</p>
          </div>
       </div>
    </div>
  )
}

export default Login;
