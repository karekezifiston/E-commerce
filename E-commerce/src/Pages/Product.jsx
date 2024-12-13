import React, { useContext } from 'react'
import {ShopContext} from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/PoductDisplay/ProductDisplay';
import DescriptionBox from '../components/Description/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import Footer from '../components/Footer';

const Products = () => {
  const {product_list}=useContext(ShopContext);
  const {productId} =useParams();
  const product = product_list.find((e)=>e.id===Number(productId))
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
    </div>
    
  )
}

export default Products
