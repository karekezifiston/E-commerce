import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove from '../assets/remove.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart} = useContext(ShopContext);
  
  // Check if the cart is empty (no items with quantity greater than 0)
  const isCartEmpty = Object.values(cartItems).every((quantity) => quantity === 0);

  return (
    <div className='cartitems'>
      {isCartEmpty ? (
        <div className='empty'>
          <h1>Your Cart is Empty</h1>
          <a href="./collection"><button>Find Your Own Outfit</button></a>
          <div className='account'>
            <h2>Have an account?</h2>
            <div className='link-to-login'>
              <a href="./login">Login</a>
              <p> to check out faster.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='cartitems-fomart-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {products.map((e) => {
            if (cartItems[e._id] > 0) {
              return (
                <div key={e._id}>
                  <div className='cartitems-format cartitems-fomart-main'>
                    <img src={e.image} width={100} alt="" className='carticon-product-icon' />
                    <p>{e.name}</p>
                    <p>${e.price}</p>
                    <button className='cartitems-quantity'>{cartItems[e._id]}</button>
                    <p>${e.price * cartItems[e._id]}</p>
                    <img
                      className='cartitems-remove-icon'
                      src={remove}
                      width={20}
                      onClick={() => removeFromCart(e._id)}
                      alt=""
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
          <div className="cartitems-down">
            <div className='cartitems-total'>
              <h1>Cart Totals</h1>
              <div>
                <div className='cartitems-total-item'>
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount()}</h3>
                </div>
              </div>
              <button>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
