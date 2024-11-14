import React from 'react';
import './Breadcrum.css';
import { Link } from 'react-router-dom';
import home from '../Assets/home.png';
import arrowback from '../Assets/arrowback.png';

const Breadcrums = (props) => {
  const { product } = props;

  if (!product) {
    return (
      <div className="breadcrum">
        <Link className="a-link homee" to="/">HOME<img src={home} width={20} height={20} alt="Home" /></Link>
        <Link className="a-link homee" to="/started">SHOP <img src={arrowback} width={15} height={15} alt="Shop" /></Link>
        Loading product details...
      </div>
    );
  }

  return (
    <div className="breadcrum">
      <Link className="a-link homee" to="/">HOME<img className='img-hom' src={home} width={20} height={20} alt="Home" /></Link>
      <Link className="a-link homee" to="/started">SHOP <img className='img-hom' src={arrowback} width={15} height={15} alt="Shop" /></Link>
      {product.category} <img  src={arrowback} width={15} height={15} alt="Arrow" /> {product.name}
    </div>
  );
};

export default Breadcrums;
