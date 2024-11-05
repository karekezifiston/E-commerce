import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload.PNG'

const AddProduct = () => {
    const[image,setImage]=useState(false);
    const[productDetails, setProductDetails]=useState({
        name:'',
        image:'',
        category:'women',
        price:''

    })

    const imageHandler =(e) =>{
       setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const add_product = async ()=>{
        console.log(productDetails)
    }


  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
            <p>Price</p>
            <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='Type here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} width={90} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={add_product} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
