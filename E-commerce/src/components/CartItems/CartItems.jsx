import React, { useContext } from 'react';
import './CartItems.css';

import { ShopContext } from '../Context/ShopContext';
import removeIcon from '../../assets/remove.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  // Check if the cart is empty (no items with quantity greater than 0)
  const isCartEmpty = Object.values(cartItems).every((quantity) => quantity === 0);

  return (
    <div className="cartitems">
      {isCartEmpty ? (
        <div className="empty">
          <h1>Your Cart is Empty</h1>
          <a href="./collection"><button>Find Your Own Outfit</button></a>
          <div className="account">
            <h2>Have an account?</h2>
            <div className="link-to-login">
              <a href="./login">Login</a>
              <p> to check out faster.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {all_product.length > 0 &&
            all_product.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <div key={product.id}>
                    <div className="cartitems-format-main">
                      <img src={product.image} width={100} alt={product.name} className="carticon-product-icon" />
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                      <button className="cartitems-quantity">{cartItems[product.id]}</button>
                      <p>${product.price * cartItems[product.id]}</p>
                      <img
                        className="cartitems-remove-icon"
                        src={removeIcon}
                        width={20}
                        onClick={() => removeFromCart(product.id)}
                        alt="remove"
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
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
