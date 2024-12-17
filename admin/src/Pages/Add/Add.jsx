import React, { useState, useEffect } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'; // Ensure assets is correctly imported

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
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

  const onChangeHandlerImage = (e) => {
    const file = e.target.files[0];
    const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && fileTypes.includes(file.type)) {
      setImage(file);
    } else {
      toast.error("Only image files (JPEG, PNG, GIF) are allowed.");
    }
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
        toast.error(response.data.message || "Failed to add product.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while adding the product.");
      console.error("Error adding product:", error);
    }
  };

  // Clean up URL.createObjectURL when image changes or component unmounts
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area} // Ensure path to assets is correct
              alt="Upload Area"
            />
          </label>
          <input
            onChange={onChangeHandlerImage}
            type="file"
            id="image"
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
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" required>
              <option value=""></option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
