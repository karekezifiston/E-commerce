import React from 'react'
import './SideBar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/add.PNG'
import list_product_icon from '../../assets/list.PNG'

const SideBar = () => {
  return (
    <div className='sidebar'> 
       <Link to={'/addproduct'} style={{textDecoration:'none'}}>
         <div className="sidebar-item">
            <img src={add_product_icon} width={60} alt="" />
            <p>Add Product</p>
         </div>
    </Link>  

       <Link to={'/listproduct'} style={{textDecoration:'none'}}>
         <div className="sidebar-item">
            <img src={list_product_icon} width={60} alt="" />
            <p>Product List</p>
         </div>
    </Link>  
    </div>
  )
}

export default SideBar
