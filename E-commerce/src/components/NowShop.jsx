import React from 'react'
import './NowShop.css'
import { Link } from 'react-router-dom'
import all_product from '../assets/all-product'
import Item from './Item/Item'
import home from './Assets/home.png'
import arrowback from './Assets/arrowback.png'
import mens from '../assets/men6.png'
import women from '../assets/women5.png'
import kid from '../assets/kid2.png'

const NowShop = (props) => {
  return (
    <div className='now-shop'>
      <div className='location'>
        <div className='home-div'>
        <Link className='a-link homee' to="/">
        <p>HOME</p>
        <img src={home} width={20}height={20} alt="" />
        </Link>
       
      
        </div>
       <div className='shop-div'>
        <p className='shop-p'>SHOP</p>
        <img src={arrowback}width={15}height={15} alt="" />
        
        
       </div>
       
      </div>
      <div className='started-shop'>
        <h1> CHOOSE YOUR CATEGORY</h1>
        <div className='switchs'>
        <Link to="/mens"><button><h1 className='shoppp'>Men</h1></button></Link>
        <Link to="/womens"><button><h1 className='shoppp'>Women</h1></button></Link>
       <Link to="/kids"><button><h1 className='shoppp'>Kids</h1></button></Link>
        </div>
        <div className='switchs-images'>
        <Link to="/mens"><img  className='mennn' src={mens} alt="" /></Link>
        <Link to="/womens"><img className='womennn' src={women} alt="" /></Link>
        <Link to="/kids"><img  className='mennn' src={kid} alt="" /></Link>
        </div>
      </div>
      <div className='relatedproducts-items'>
        {all_product.map((item,i)=>{
         if (props.category===item.category){
          return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
         }
         else{
          return null;
         }
        })}
      </div>
    </div>
  )
}

export default NowShop
