import React,{ useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import account from '../assets/User-1.png'
import cart from '../assets/cart.png'

const NavBar = () => {
  const [menu,setMenu] =useState("shop");
  


  return (
    <div className='navbar'>
       <div className='logo'>
          <img src="" alt="" />
           <h1>Saints Shop</h1>
       </div>

       <ul className='nav-links'>
          <li onClick={()=>{setMenu("shop")}}>
            <Link className={`a  ${menu === "shop" ? "active" : ""}`} to='/'> Home </Link>
          </li>
  
          <li onClick={()=>{setMenu("about")}}>
            <Link className={`a  ${menu === "about" ? "active" : ""}`} to='/about'> About </Link>
            </li>
    
          <li onClick={()=>{setMenu("started")}}>
            <Link className={`a  ${menu === "started" ? "active" : ""}`} to='/started'> Get Started </Link>
            </li>

          <li onClick={()=>{setMenu("contact")}}>
            <Link className={`a  ${menu === "contact" ? "active" : ""}`} to='/contact'> Contact </Link>
          </li>
       </ul>

       
        <div className='login-cart'>
             <Link to='/'><img src={cart} width={30} alt="" className='cart-icon'/></Link>
             <Link to='/login'><img src={account} width={30} alt="" className='login-icon' /></Link> 
        </div>
    </div>
  )
}

export default NavBar
