import React, { useState } from 'react'
import './Service.css'

import men from '../assets/men-clothes.png'
import women from '../assets/women-clothes.png'
import womens from '../assets/women5.png'
import kids from '../assets/kids-clothes.png'
import kid from '../assets/kid2.png'
import mens from '../assets/men2.png'
import line from '../assets/line.png'
import { Link } from 'react-router-dom'
import down from '../assets/down.png'
import refresh from '../assets/refresh.png'
// import women from '../assets/women-clothes2.png'
const Service = () => {
  return (
    <div className='service' id='service'>
     <div className='titles'>
        <h1 className='ser'>Services.</h1>
         <p className='cat'>Categories</p>
     </div>
      <div className='category'>
        <div className='hkkk'>
        <div className='men'>
            <h2>Men Category</h2>
            <div className='lll'>
            <Link to="/mens"
            className={`link-cat ${Link ==="men"? "":""}`} href="">
              <div className='lll tc-container'>
            <img src={mens} className='under-img' alt="" />
            <img src={men} className='top-img' alt="" />
            </div>
            </Link>
            <div className='hhh'>
            <p className='p-men1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='btns mens-btn'>
            <Link to="/mens" className='linkk'><p>Shop</p></Link>
            <Link to="/mens" className='aaaa' href=""><hr className='aaa'/></Link>
             </div>
             </div>
           </div>

        </div>
        <a href="#kid"><img className='lol' src={down}width={40} alt="" /></a>
        </div>
        <div className='women'>
            <h2 className='women-p'>Women Category</h2>
           <div className='lllk rw'> 
           <Link to="/womens" className='link-cat lll rw' href="">
            <div className='par-btn'>
            <p className='p-men2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='btns btn-women'>
            <Link to="/womens" className='linkk'><p>Shop</p></Link>
            <Link to="/womens" className='aaaa' href=""><hr className='aaa ab'/></Link>
            </div>
            </div>
            <div className='lll tc-container'>
            <img src={womens} alt="" />
            <img src={women} className='top-img' alt="" />
            </div>
            <div className='par-btn2'>
            <p className='p-men2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='yego btns-yego '>
            <Link to="/womens" className='linkk'><p>Shop</p></Link>
            <Link to="/womens" className='aaaa' href=""><hr className='aaa ab'/></Link>
            </div>
            </div>

            </Link>
           </div>
        </div>
        <div className='kids' id='kid'>
            <h2>Kids Category</h2>
            <div className='lll'>
            <div className='tc-container'>
            <Link to="/kids" className='link-cat' href="product">
            <img src={kid} alt="" />
            <img src={kids} className='top-img' alt="" />
            </Link>
            </div>
            <div className='jtt'>
            <div className='jttn'>
            <p className='p-men3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus nihil reiciendis, a error minus, autem nostrum, et ratione esse possimus recusandae? Repudiandae commodi eveniet delectus et non minima quo!</p>
            <div className='btns btn-kid'>
            <Link to="/kids" className='linkk'><p>Shop</p></Link>
            <Link to="/kids" className='aaaa' href=""><hr className='aaa'/></Link>
            </div>
            </div>
             <a href="#"> <img src={refresh}width={30}height={30} className='llllf' alt="" /></a>
             </div>
            </div>
           
        </div>
        </div>
    </div>
  )
}

export default Service
