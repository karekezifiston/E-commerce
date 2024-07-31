import React,{ useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [menu,setMenu] =useState("shop");
  
  

  
/* ----------------- Nagushishikariza gukuraho zino shii ziri munsi -------------------------------

const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (linkName) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  */
 

  return (
    <div className='navbar'>
       <div className='logo'>
          <img src="" alt="" />
           <h1>Saints Shop</h1>
       </div>

       <ul className='nav-links'>
          <li onClick={()=>{setMenu("shop")}}>
            <Link className={`a Home ${menu === "shop" ? "active" : ""}`} to='/'> Home </Link>
          </li>
  
          <li onClick={()=>{setMenu("about")}}>
            <Link className={`a About ${menu === "about" ? "active" : ""}`} to='/about'> About </Link>
            </li>
    
          <li onClick={()=>{setMenu("started")}}>
            <Link className={`a Started ${menu === "started" ? "active" : ""}`} to='/started'> Get Started </Link>
            </li>

          <li onClick={()=>{setMenu("contact")}}>
            <Link className={`a Contact ${menu === "contact" ? "active" : ""}`} to='/contact'> Contact </Link>
          </li>
       </ul>

       
        <div className='login-cart'>
             <Link to='/cart'><i></i> </Link>
             <Link to='/login'><i></i></Link>
             <i className="fa-solid fa-user"></i>
        </div>
    </div>
  )
}

export default NavBar
