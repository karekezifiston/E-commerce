import React from 'react'
import './Hero.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import menTrend from '../assets/mens1.png'
import womenTrend from '../assets/womens.png'
import women from '../assets/womens1.png'
import mens from '../assets/mens2.png'
import down from '../assets/down.png'

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2550,
    cssEase: "linear"
  };
  return (
    <div id='hero' >
      <div className='twoss'>
      <div className="slider-container">
        <div className='hero-title'>
          <h1>New Trends </h1> 
        </div>
      <Slider {...settings}>
        <div>
        <img src={women} className='yyy' alt="" />
        </div>
        <div>
        <img src={mens} className='yy' alt="" />
        </div>
        <div>
        <img src={menTrend}className='yyy' alt="" />
        </div>
        <div>
        <img src={womenTrend}className='yyy' alt="" />
        </div>
      </Slider>
    </div>
    <a href="#service"><img className='fg' src={down}width={40} alt="" /></a>
    </div>
    </div>
  )
}

export default Hero
