import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload.png';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    price: ''
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {
    if (!productDetails.name || !productDetails.price || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    // Step 1: Upload the image to the backend
    const formData = new FormData();
    formData.append('product', image);

    let responseData;
    await fetch('https://shop-eco-backend.onrender.com/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    // Step 2: If image upload is successful, add product details
    if (responseData.success) {
      const updatedProduct = {
        ...productDetails,
        image: responseData.image_url
      };

      // Step 3: Send product details to the backend
      await fetch('https://shop-eco-backend.onrender.com/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert('Product Added Successfully')
            : alert('Failed to Add Product');
        });
    } else {
      alert('Image upload failed');
    }
  };

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder='Type here'
        />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="text"
            name='price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            width={90}
            className='addproduct-thumnail-img'
            alt="Upload"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file-input'
          hidden
        />
      </div>
      <button onClick={addProduct} className='addproduct-btn'>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
