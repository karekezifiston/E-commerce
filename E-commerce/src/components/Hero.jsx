import React from 'react'
import './Hero.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import menTrend from '../assets/trends3.png'
import womenTrend from '../assets/trends2.png'
import women from '../assets/women-clothes2.png'

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5890,
    cssEase: "linear"
  };
  return (
    <div id='hero' >
      <div className="slider-container">
        <div className='hero-title'>
          <h1>New Trends </h1> 
        </div>
      <Slider {...settings}>
        <div>
        <img src={women} className='yy' alt="" />
        </div>
        <div>
        <img src={womenTrend}className='yy' alt="" />
        </div>
        <div>
        <img src={menTrend}className='yy' alt="" />
        </div>
        <div>
        <img src={womenTrend}className='yy' alt="" />
        </div>
      </Slider>
    </div>
    </div>
  )
}

export default Hero
