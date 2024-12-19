import React, { useContext, useEffect, useState } from 'react';
import './Hero.css';
import { ShopContext } from './Context/ShopContext';
import Item from './Item/Item'; // Importing the Item component

const Hero = () => {
  const {product_list } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (product_list) {
      setBestSeller(product_list.slice(0, 4)); // Get the first 5 products as bestsellers
    }
  }, [product_list]);

  return (
    <div className="hero">
      <div className="title-trend">
        <h1 className='ser'>Our Trends</h1>
      </div>
      <div className="product-items">
        {bestSeller.map((item, index) => (
          <Item
            key={index}
            id={item._id} // Assuming _id is the unique field
            image={item.image}
            name={item.name}
            type={item.type}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
