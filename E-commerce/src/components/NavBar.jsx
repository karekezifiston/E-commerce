import React,{ useContext, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import account from '../assets/User-1.png'
import cart from '../assets/bag.png'
import { ShopContext } from './Context/ShopContext'

const NavBar = () => {
  const [menu,setMenu] =useState("shop");
  const {getTotalCartItems}=useContext(ShopContext);

  const [isOpen, setIsOpen] = useState(false);









  // BURGER MENU FUNCTION
  const toggleMobileMenu = () => {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_panel = document.querySelector('.Mobile_panel');

    menu_btn.classList.toggle('is-active');
    mobile_panel.classList.toggle('is-active');

  };




  return (
    <div className='navbar' id='refresh'>

      <div className='Mobile_panel'>
        <div className='menu-items'>
          <h3 className='menu-option'>Home</h3>
          <h3 className='menu-option'>Shop</h3>
          <h3 className='menu-option'>About</h3>
          <h3 className='menu-option'>Contact</h3>
        </div>
      </div>

      <div className='logo-links'>
        <div className='logo'>
          <img src="" alt="" />
          <h1>Saints Shop</h1>
        </div>

        <div className='menuu'>
          <div className="hamburger_container">
              <button className="hamburger" onClick={toggleMobileMenu}>
                  <div className="bar"></div>
              </button>
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
