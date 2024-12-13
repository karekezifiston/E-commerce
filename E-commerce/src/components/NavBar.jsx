import React, { useContext, useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import cart from '../assets/bag.png';
import saints from '../assets/saints.png';
import { ShopContext } from './Context/ShopContext';

const NavBar = () => {
  // Initialize menu state from localStorage or default to 'shop'
  const [menu, setMenu] = useState(localStorage.getItem('selectedMenu') || 'shop');
  const { getTotalCartItems } = useContext(ShopContext);

  // Persist menu state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedMenu', menu);
  }, [menu]);

  // BURGER MENU FUNCTION
  const toggleMobileMenu = () => {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_panel = document.querySelector('.Mobile_panel');

    menu_btn.classList.toggle('is-active');
    mobile_panel.classList.toggle('is-active');
  };

  const handleLinkClick = () => {
    toggleMobileMenu(false);
  };

  return (
    <div className="navbar" id="refresh">
      <div className="Mobile_panel">
        <ul className="menu-items">
          <li className="menu-option" onClick={() => setMenu('shop')}>
            <Link
              onClick={handleLinkClick}
              className={`a ${menu === 'shop' ? 'active' : ''}`}
              to="/"
            >
              Home
            </Link>
          </li>

          <li className="menu-option" onClick={() => setMenu('started')}>
            <Link
              onClick={handleLinkClick}
              className={`a ${menu === 'started' ? 'active' : ''}`}
              to="./Started"
            >
              Shop
            </Link>
          </li>

          <li className="menu-option" onClick={() => setMenu('about')}>
            <Link
              onClick={handleLinkClick}
              className={`a ${menu === 'about' ? 'active' : ''}`}
              to="/about"
            >
              About
            </Link>
          </li>

          <li className="menu-option" onClick={() => setMenu('contact')}>
            <Link
              onClick={handleLinkClick}
              className={`a ${menu === 'contact' ? 'active' : ''}`}
              to="/contact"
            >
              Contact
            </Link>
          </li>
          <Link to="/login">
            <button
              onClick={() => setMenu('login')}
              className="login-button"
            >
              Login
            </button>
          </Link>
        </ul>
      </div>

      <div className="logo-links">
        <a className="logo-link" href="#">
          <div className="logo">
            <h1 className="logo-saint"><img src={saints}width={90} alt="" /></h1>
          </div>
        </a>

        <div className="menuu">
          <div className="hamburger_container">
            <button className="hamburger" onClick={toggleMobileMenu}>
              <div className="bar"></div>
            </button>
          </div>

          <ul className="nav-links">
            <li onClick={() => setMenu('shop')}>
              <Link
                className={`a ${menu === 'shop' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li onClick={() => setMenu('started')}>
              <Link
                className={`a ${menu === 'started' ? 'active' : ''}`}
                to="./Started"
              >
                Shop
              </Link>
            </li>

            <li onClick={() => setMenu('about')}>
              <Link
                className={`a ${menu === 'about' ? 'active' : ''}`}
                to="/about"
              >
                About
              </Link>
            </li>

            <li onClick={() => setMenu('contact')}>
              <Link
                className={`a ${menu === 'contact' ? 'active' : ''}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="log">
        <h1 className="logo-saint"><img src={saints}width={90} alt="" /></h1>
      </div>
      <div className="login-cart">
        {localStorage.getItem('auth-token') ? (
          <button
            className="login-button responsive"
            onClick={() => {
              localStorage.removeItem('auth-token');
              window.location.replace('/');
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button
              onClick={() => setMenu('login')}
              className="login-button responsive"
            >
              Login
            </button>
          </Link>
        )}
        <Link to="/cart">
          <img
            onClick={() => setMenu('cart')}
            src={cart}
            width={30}
            alt=""
            className="cart-icon"
          />
        </Link>
        <div className="navbar-number">
          <Link className="linkkkk" to="cart">
            {getTotalCartItems()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
