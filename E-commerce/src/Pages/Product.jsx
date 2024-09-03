import React, { useContext } from 'react'
import {ShopContext} from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/PoductDisplay/ProductDisplay';
import DescriptionBox from '../components/Description/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import Footer from '../components/Footer';

const Products = () => {
  const {all_product}=useContext(ShopContext);
  const {productId} =useParams();
  const product = all_product.find((e)=>e.id===Number(productId))
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
      {/* <Footer/> */}
    </div>
    
  )
}

export default Products
