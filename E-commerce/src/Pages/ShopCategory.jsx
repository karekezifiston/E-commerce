import React, { useContext } from 'react'
import '../Pages/ShopCategory.css'
import {ShopContext} from '../components/Context/ShopContext'
import  Item from '../components/Item/Item'

const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext)
  return (
    <div className='shop-category'>
      {/* <img className='shopcategory-banner' src={props.banner}  alt="" /> */}
       <div className='shopcategory-products'>
        {all_product.map((item,i)=>{
         if (props.category===item.category){
          return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
         }
         else{
          return null;
         }
        })}
      </div> 
    </div>
  )
}

export default ShopCategory
