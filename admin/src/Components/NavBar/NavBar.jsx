import React from 'react'
import './NavBar.css'
import navProfile from '../../assets/fis.PNG'

const NavBar = () => {
  return (
    <div className='navbar'>
      <h1 className='logo-saint'>SAINTS</h1>
      <img className='navprofile' src={navProfile} alt=""  width={50}/>
    </div>
  )
}

export default NavBar
