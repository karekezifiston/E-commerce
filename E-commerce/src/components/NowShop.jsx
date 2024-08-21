import React from 'react'
import './NowShop.css'
import all_product from '../assets/all-product'
import Item from './Item/Item'
import home from './Assets/home.png'
import arrowback from './Assets/arrowback.png'

const NowShop = (props) => {
  return (
    <div className='now-shop'>
      <div className='location'>
        <div className='home-div'>
        <a href="/">
        <p>HOME</p>
        </a>
       <img src={home} width={20}height={20} alt="" />
      
        </div>
       <div className='shop-div'>
       <a href="">
        <p>SHOP</p>
        </a>
        <img src={arrowback}width={20}height={20} alt="" />
       </div>
       
      </div>
      <div className='started-shop'>
        <h1>Products in Our Shop</h1>
        <p>Defferent Categories</p>
        <h1 className='shoppp'>Shop</h1>
      </div>
      <div className='relatedproducts-items'>
      {all_product.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
        
        })}
      </div>
    </div>
  )
}

export default NowShop
