import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'; // Ensure assets is correctly imported

const Add = ({ url }) => {
  const [image, setImage] = useState(null); // Default state is null instead of false
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    if (image) {
      formData.append('image', image); // Add image if it exists
    }

    try {
      const response = await axios.post(`${url}/api/product/add`, formData);
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: '',
        });
        setImage(null); // Reset the image after upload
        toast.success(response.data.message); // Display success message
      } else {
        toast.error(response.data.message); // Display error message
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area} // Ensure path to assets is correct
              alt="Upload Area"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='Type here'
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows='6'
            placeholder='Write content here'
            required
          ></textarea>
        </div>

        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              required
            >
              <option value=""></option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
          </div>
          <div className="add-price fle-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder='$20'
              required
            />
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
