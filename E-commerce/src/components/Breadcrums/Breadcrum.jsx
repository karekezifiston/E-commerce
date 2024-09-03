import React from 'react'
import './Breadcrum.css'
import { Link } from 'react-router-dom'
import home from '../Assets/home.png'
import arrowback from '../Assets/arrowback.png'


const Breadcrums = (props) => {
  const {product}=props;
  return (
    <div className='breadcrum'>
     <Link className='a-link homee' to="/">HOME<img src={home} width={20}height={20}alt="" /></Link>
     <Link className='a-link homee' to="/started">SHOP <img src={arrowback}width={15}height={15} alt="" /></Link>
     {product.category} <img src={arrowback}width={15}height={15} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrums
