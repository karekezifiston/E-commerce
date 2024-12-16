import React from 'react'
import './NowShop.css'
import { Link } from 'react-router-dom'
import all_product from '../assets/all-product'
import Item from './Item/Item'
import home from './Assets/home.png'
import arrowback from './Assets/arrowback.png'
import menss from '../assets/menss.png'
import womenss from '../assets/womenss.png'
import kidd from '../assets/kidd.png'

const NowShop = (props) => {
  return (
    <div className='now-shop'>
      <div className='location'>
        <div className='home-div'>
        <Link className='a-link homee' to="/">
        <p className='location-p'>HOME</p>
        <img src={home} width={20}height={20} alt="" />
        </Link>
       
      
        </div>
       <div className='shop-div'>
        <p className='shop-p location-p'>SHOP</p>
        <img src={arrowback}width={15}height={15} alt="" />
        
        
       </div>
       
      </div>
       <div className='title-cat'>
       <h1> CHOOSE YOUR CATEGORY</h1>
       </div>
        <div className='started-shop'>
        <div className='switchs'>
        <Link to="/mens"><button><h1 className='shoppp'>Men</h1></button></Link>
        <Link to="/womens"><button><h1 className='shoppp'>Women</h1></button></Link>
       <Link to="/kids"><button><h1 className='shoppp'>Kids</h1></button></Link>
        </div>
        <div className='switchs-images'>
        <Link to="/mens"><img  className='menn hover-image' src={menss} alt="" /></Link>
        <Link to="/womens"><img className='womennn hover-image' src={womenss} alt="" /></Link>
        <Link to="/kids"><img  className='mennn hover-image' src={kidd} alt="" /></Link>
        </div>
      </div>
    </div>
  )
}

export default NowShop
