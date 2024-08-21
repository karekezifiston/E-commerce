import React from 'react'
import './Footer.css'
import location from '../assets/location.png'
import airtel from '../assets/airtel.png'
import mtn from '../assets/mtn.png'
import visa from '../assets/visa.png'
import mastercard from '../assets/mastercard.png'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='ways'>
        <div className='first-way'>
        <div className='logo'>
          <img src="" alt="" />
           <h1>Saints Shop</h1>
       </div>
        </div>
        <div className='second-way'>
          <img src={location} alt="" />
          <div className='second'>
            <p>KN 27 St, Nyarugenge,</p>
            <p>Kigali, Rwanda</p>
          </div>
        </div>
        <div className='third-way'>
          <a href="">karekezifiston30@gmail.com</a>
          <a href="">+250 780 377 645</a>
        </div>
      </div>
      {/* <hr  className='hrr'/> */}
      <div className='other-ways'>
        <p>&copy; Saints 2024 All rights reserved</p>
        <div className='footer-photos'>
          <img src={airtel} width={25} alt="" />
          <img src={mtn} width={25} alt="" />
          <img src={visa} width={25} alt="" />
          <img src={mastercard} width={25} alt="" />
        </div>
      </div>
      
    </div>
  )
}

export default Footer
