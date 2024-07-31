import React,{ useState } from 'react'
import './NavBar.css'
import acount from '../assets/user.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [menu,setMenu] =useState("shop");
  // const [hoveredLink, setHoveredLink] = useState(null);

  // const handleMouseEnter = (linkName) => {
  //   setHoveredLink(linkName);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredLink(null);
  // };

  return (
    <div className='navbar'>
       <div className='logo'>
          <img src="" alt="" />
           <h1>Saints Shop</h1>
       </div>
       <ul className='nav-links'>
          <li onClick={()=>{setMenu("shop")}}><Link className='a' style={{textDecoration:'none', color:'#626262'}} to='/'>Home{menu==="shop"?<hr className='line'/>:<></>}</Link></li>
          <li onClick={()=>{setMenu("about")}}><Link className='a' style={{textDecoration:'none', color:'#626262'}} to='/about'>About{menu==="about"?<hr className='line'/>:<></>}</Link></li>
          <li onClick={()=>{setMenu("started")}}><Link className='a' style={{textDecoration:'none', color:'#626262'}} to='/started'>Get Started{menu==="started"?<hr className='line'/>:<></>}</Link></li>
          <li onClick={()=>{setMenu("contact")}}><Link className='a' style={{textDecoration:'none', color:'#626262'}} to='/contact' >Contact{menu==="contact"?<hr className='line'/>:<></>}</Link></li>
       </ul>
        <div className='login-cart'>
             <Link to='/cart'><i></i> </Link>
             <Link to='/login'><i></i></Link> ;
        </div>
    </div>
  )
}

export default NavBar
