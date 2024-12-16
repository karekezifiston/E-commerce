import React, { useContext}from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
const Item = (props) => {
  const {url}=useContext(ShopContext)
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={`${url}/images/`+props.image} className='img-item' alt="" /></Link>
      <p>{props.name}</p>
      <div className='item-prices'>
        <div className='item-prices'>
            ${props.price}
        </div>
         {/* <div className='item-price-old'>
           {props.old_price}
         </div> */}
      </div>
    </div>
  )
}

export default Item
