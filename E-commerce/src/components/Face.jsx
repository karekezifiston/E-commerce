import React from 'react';
import './Face.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Face = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1048px)' });

  // Slider settings
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isSmallScreen, // Enable autoplay only for screens 800px or smaller
    speed: 3900,
    autoplaySpeed:3000,
    cssEase: 'linear',
  };

  return (
    <section className="faces">
      <div className='short-imgs'>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      </div>
      <div className="face">
        <div className="nav">
          <div className="slider-container">
            <Slider className="di" {...settings}>
              <div className="Trend">
                <div className="card">
                  <div className="first_border">
                    <img src={image1} alt="" className="img_one" />
                    <img src={image2} alt="" className="img_one" />
                  </div>
                </div>
              </div>

              <div className="Trend">
                <div className="card">
                  <div className="first_border">
                    <img src={image1} alt="" className="img_one" />
                    <img src={image2} alt="" className="img_one" />
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="face-footer">
          <div className="social-media">
            <p>Follow us</p>
            <div className="scial-medias">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} className="bj" />
              </a>
              <a
                href="https://www.linkedin.com/in/fiston-karekezi-50299726b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={24} className="bj" />
              </a>
            </div>
          </div>
          <div className="Sroll">
            <a className="scroll-link" href="#hero">
            </a>
          </div>
        </div>
      </div>
      <div className='short-imgs'>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      <div className="other-images">
        <img src={image1} alt="" className="img_on" />
        <img src={image2} alt="" className="img_on" />
      </div>
      </div>
    </section>
  );
};

export default Face;
