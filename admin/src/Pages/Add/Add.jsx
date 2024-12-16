import React, { useState } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });

    // Handle input changes for text, number, and dropdown fields
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle file upload with validation for file type and size
    const onImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            toast.error("Image size should not exceed 2MB.");
            return;
        }

        setImage(file);
    };

    // Handle form submission and send data to backend
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add the product. Please try again later.");
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler} encType="multipart/form-data">
                {/* Image Upload */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="Upload preview"
                            onError={(e) => (e.target.src = assets.upload_area)} // Fallback if preview fails
                        />
                    </label>
                    <input
                        onChange={onImageChangeHandler}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* Product Name */}
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

                {/* Product Description */}
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

                {/* Category and Price */}
                <div className="add-category-price">
                    {/* Category */}
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select
                            onChange={onChangeHandler}
                            name="category"
                            value={data.category}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>

                    {/* Price */}
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

                {/* Submit Button */}
                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;
