import React from 'react'
import './Face.css'
import image from '../assets/back.png'

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
        <div>
          
        </div>
      </div>
      <div className='Sroll'>
       <a className='scroll-link' href="#hero">
       <p>scroll</p>
       <img src="" alt="" />
       </a>
     </div>
      </div>
      
    </div>
  )
}

export default Face
