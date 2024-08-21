import React from 'react'
import './Breadcrum.css'

const Breadcrums = (props) => {
  const {product}=props;
  return (
    <div className='breadcrum'>
      HOME <img src='' alt="" /> SHOP <img src='' alt="" />{product.category} <img src="" alt="" /> {product.name}
    </div>
  )
}

export default Breadcrums;;;
