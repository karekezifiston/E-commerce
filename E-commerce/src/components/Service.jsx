import React from 'react'
import './Service.css'

import men from '../assets/men-clothes.png'
import women from '../assets/women-clothes.png'
import kids from '../assets/kids-clothes.png'
import line from '../assets/line.png'
import { Link } from 'react-router-dom'
// import women from '../assets/women-clothes2.png'
const Service = () => {
  return (
    <div className='service' id='service'>
     <div className='titles'>
        <h1 className='ser'>Services</h1>
         <p className='cat'>Categories</p>
     </div>
      <div className='category'>
        <div className='men'>
            <h2>Men Clothes</h2>
            <div className='lll'>
            <Link to="/mens" className='link-cat' href="">
              <div className='lll tc-container'>
            <img src={men} className='under-img' alt="" />
            <img src={women} className='top-img' alt="" />
            </div>
            </Link>
            <div className='hhh'>
            <p className='p-men'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='btns mens-btn'>
            <Link to="/mens" className='linkk'><p>Shop</p></Link>
            <Link to="/mens" className='aaaa' href=""><hr className='aaa'/></Link>
             </div>
             </div>
           </div>

        </div>
        <div className='women'>
            <h2 className='women-p'>Women Clothes</h2>
           <div className='lll rw'> 
           <Link to="/womens" className='link-cat lll rw' href="">
            <p className='p-men'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='lll tc-container'>
            <img src={women} alt="" />
            <img src={men} className='top-img' alt="" />
            </div>
            </Link>
           </div>
           <div className='btns'>
            <Link to="/womens" className='linkk'><p>Shop</p></Link>
            <Link to="/womens" className='aaaa' href=""><hr className='aaa ab'/></Link>
            </div>
        </div>
        <div className='kids'>
            <h2>Kids Clothes</h2>
            <div className='lll'>
              <div className='tc-container'>
            <Link to="/kids" className='link-cat' href="product">
            <img src={kids} alt="" />
            <img src={men} className='top-img' alt="" />
            </Link>
            </div>
            <div>
            <p className='p-men'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='btns'>
            <Link to="/kids" className='linkk'><p>Shop</p></Link>
            <Link to="/kids" className='aaaa' href=""><hr className='aaa'/></Link>
            </div>
            </div>
           </div>
        </div>
        </div>
    </div>
  )
}

export default Service
