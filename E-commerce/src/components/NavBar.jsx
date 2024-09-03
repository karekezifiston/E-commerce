import React,{ useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'
import { Link } from 'react-router-dom'
import account from '../assets/User-1.png'
import cart from '../assets/bag.png'
import { ShopContext } from './Context/ShopContext'

const NavBar = () => {
  const [menu,setMenu] =useState("shop");
  const {getTotalCartItems}=useContext(ShopContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='navbar' id='refresh'>
      <div className='logo-links'>

      <div className='logo'>
          <img src="" alt="" />
           <h1>Saints Shop</h1>
       </div>
       <div className='menuu'>
       <div className="menu-bar-toggle" onClick={toggleMenu}>
        {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </div>
       <ul className={`nav-links ${isOpen ?'open' :'' }`}>
          <li onClick={()=>{setMenu("shop")}}>
            <Link className={`a  ${menu === "shop" ? "active" : ""}`} to='/'> Home </Link>
          </li>

          <li onClick={()=>{setMenu("started")}}>
            <Link className={`a  ${menu === "started" ? "active" : ""}`} to='./Started'>Shop </Link>
            </li>
  
          <li onClick={()=>{setMenu("about")}}>
            <Link className={`a  ${menu === "about" ? "active" : ""}`} to='/about'> About </Link>
            </li>

          <li onClick={()=>{setMenu("contact")}}>
            <Link className={`a  ${menu === "contact" ? "active" : ""}`} to='/contact'> Contact </Link>
          </li>
       </ul>
       </div>
      </div>

       

       
        <div className='login-cart'>
        <Link to='/login'><img src={account} width={30} alt="" className='login-icon' /></Link> 
        <Link to='/cart'><img src={cart}width={30}alt=""className='cart-icon'/></Link>
        <div className='navbar-number'><Link className='linkkkk' to='cart'>{getTotalCartItems()}</Link></div>
        </div>
    </div>
  )
}

export default NavBar
