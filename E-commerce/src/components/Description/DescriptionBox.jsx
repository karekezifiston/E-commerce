import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionBox-nav'>
          <div className='descriptionbox-nav-box'>Description</div>
          <div className='descriptionbox-nav-box fade'>Reviews</div>
        </div>
        <div className='descriptionbox-description'>
          <p>This website is an online platform that facilitates the buying of our products or other services over internet, and it really makes 
            things in a short time, this website was made for our clients who are not hear to our office
            but this project is to make it easy to you by delivering our service or productsn to you own place  </p>
        </div>
    </div>
  )
}

export default DescriptionBox
