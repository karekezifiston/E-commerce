import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // Check if product exists before rendering
    if (!product) {
        return <div>Loading product details...</div>; // Show loading or fallback content
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className='productdisplay-img-list'>
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className='productdisplay-right-star'></div>
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
                <button onClick={() => addToCart(product._id)}>ADD TO BAG</button>
                <p className='productdisplay-right-category'>
                    <span>Gender:</span> <span className='category-title'>{product.category}</span>, best designs on market
                </p>
                <p className='productdisplay-right-category'>
                    <span>TAGS:</span> Modern, Latest
                </p>
            </div>
        </div>
    );
}

export default ProductDisplay;
