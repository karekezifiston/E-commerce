import React, { useContext, useEffect, useState } from 'react';
import './Hero.css';
import { ShopContext } from './Context/ShopContext';
import Item from './Item/Item'; // Importing the Item component

const Hero = () => {
  const { all_product } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (all_product) {
      setBestSeller(all_product.slice(0, 4)); // Get the first 5 products as bestsellers
    }
  }, [all_product]);

  return (
    <div className="hero">
      <div className="title-trend">
        <h1>Our Trends</h1>
      </div>
      <div className="product-items">
        {bestSeller.map((item, i) => (
          <Item
            key={i}
            id={item.id} // Assuming _id is the unique field
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
