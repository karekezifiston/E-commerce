import React from 'react'
import './Face.css'
import image from '../assets/back.png'
import down from '../assets/down.png'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Face = () => {
  return (
    <div className='face'>
      <div  className='nav'>
      <div className='right-part'>
        <div className='line-p'>
          <hr  className='hr-line'/>
          <p><b>HERE NOW</b></p>
        </div>
        <div>
          <p className='big'><span>WEAR</span><br /> THE DIFFERENCE</p>
        </div>
        <p className='border-face '><a className='active v f' href="#service"><b>DISCOVER MORE</b></a></p>
      </div>
      <div className='left-part'>
        <img  className='imgg' src={image} alt="" />
      </div>
      </div>
      <div className='face-footer'>
      <div className="social-media">
        <p>Follow us</p>
        <div className='scial-medias'>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={24} className='bj'/>
      </a>
      <a href="https://www.linkedin.com/in/fiston-karekezi-50299726b/" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn size={24} className='bj' />
      </a>
        </div>
      </div>
      <div className='Sroll'>
       <a className='scroll-link' href="#hero">
       {/* <p>scroll</p> */}
       <img src={down} width={40} alt="" />
       </a>
     </div>
      </div>
      
    </div>
  )
}

export default Face
