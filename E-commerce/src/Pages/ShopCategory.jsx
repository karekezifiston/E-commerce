import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Pages/ShopCategory.css'
import {ShopContext} from '../components/Context/ShopContext'
import  Item from '../components/Item/Item'
import { Link } from 'react-router-dom'
import home from '../assets/home.png'
import arrowback from '../assets/arrowback.png'
import location from '../assets/location.png'
import airtel from '../assets/airtel.png'
import mtn from '../assets/mtn.png'
import visa from '../assets/visa.png'
import mastercard from '../assets/mastercard.png'
import mens from '../assets/men6.png'
import women from '../assets/women5.png'
import kid from '../assets/kid2.png'
// import { useParams } from 'react-router-dom';

const ShopCategory = (props) => {
  const {category}=props;
  // const [button,setButton]=useState("");
  const {product_list}=useContext(ShopContext)

  return (
    <div className='shop-category'>
       <div className='location'>
        <div className='home-div'>
        <Link className='a-link homee' to="/">
        <p className='loca-p'>HOME</p>
        <img src={home} width={20}height={20} alt="" />
        </Link>
       
      
        </div>
       <div className='shop-div'>
        <p className='shop-p loca-p'>SHOP</p>
        <img src={arrowback}width={15}height={15} alt="" />
        
        
       </div>
       
      </div>
      <div className='started-shop move'>
        <h1 className='category-title'>{category}<hr className='hr-cat'/></h1>
      </div>
       <div className='shopcategory-products'>
        {product_list.map((item,i)=>{
         if (props.category===item.category){
          return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
         }
         else{
          return null;
         }
        })}
      </div> 
      <div className='started-shop move'>
        <h1> Choose Other Categories</h1>
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
      <div className='footer' id='footer'>
      <div className='ways'>
        <div className='first-way'>
        <div className='logo'>
          <img src="" alt="" />
           <h1>Saints Shop</h1>
       </div>
        </div>
        <div className='second-way'>
          <img src={location} alt="" />
          <div className='second'>
            <p>KN 27 St, Nyarugenge,</p>
            <p>Kigali, Rwanda</p>
          </div>
        </div>
        <div className='third-way'>
          <a href="">karekezifiston30@gmail.com</a>
          <a href="">+250 780 377 645</a>
        </div>
      </div>
      {/* <hr  className='hrr'/> */}
      <div className='other-ways'>
        <p>&copy; Saints 2024 All rights reserved</p>
        <div className='footer-photos'>
          <img src={airtel} width={25} alt="" />
          <img src={mtn} width={25} alt="" />
          <img src={visa} width={25} alt="" />
          <img src={mastercard} width={25} alt="" />
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default ShopCategory
