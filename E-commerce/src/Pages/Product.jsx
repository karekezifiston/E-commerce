import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { useParams} from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/PoductDisplay/ProductDisplay';
import DescriptionBox from '../components/Description/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import Footer from '../components/Footer';

const Products = () => {
  const { product_list } = useContext(ShopContext);
  const { productId } = useParams();

  // Ensure productId and product._id are both strings
  const product = product_list.find((e) => e._id === productId);

  if (!product) {
    // If no product is found, show a loading or redirect message
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      {/* <RelatedProducts product={product} /> */}
      <Footer />
    </div>
  );
};

export default Products;
