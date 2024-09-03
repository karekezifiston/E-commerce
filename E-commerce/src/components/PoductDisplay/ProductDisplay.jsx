import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart}=useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
         <div className='productdisplay-img-list'>
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
         </div>
         <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
         </div>
      </div>
       <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className='productdisplay-right-star'>

            </div>
     <div className='productdisplay-right-price'>
        <div className='productdisplay-price'>${product.price}</div>
     </div>
      <div className='productdisplay-right-size'>
        <h1>Select Size</h1>
        <div className='productdisplay-right-sizes'>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
        </div>
      </div>
      <button onClick={()=>{addToCart(product.id)}}>ADD TO BAG</button>
      <p className='productdisplay-right-category'>
        <span>Category:</span> <span className='category-title'>{product.category}</span>, best desings on market</p>
      <p className='productdisplay-right-category'>
        <span>Tags:</span>Modern, Latest</p>
     </div>
    </div>
  )
}

export default ProductDisplay
