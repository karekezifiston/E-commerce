import React from 'react'
import './RelatedProducts.css'
import all_product from "../../assets/all-product"
import Item from '../Item/Item'

const RelatedProducts = (props) => {
  return (
    <div className='relatedproducts'>
       <h1>Related Products</h1>
       <hr />
       <div className='relatedproducts-items'>
         {all_product.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
        
        })}
       </div>
    </div>
  )
}

export default RelatedProducts
