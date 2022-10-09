import React, {useContext} from 'react'
import {ProductsContext} from '../Globel/ProductsContext'
import Banner from './Banner';
import {CartContext} from '../Globel/CartContext'

function Products() {
   const {products} = useContext(ProductsContext);
   const {dispatch} = useContext(CartContext)
  //  console.log(products);
  return (
        
        <div className="product-container">
            {/* <Banner/> */}
      <div className='products'>
         {products.map((product) => {
           return(
            <div className="product" key={product.id}>
            <div className="product-img">
            {product.status === 'hot' ? <div className='hot'>Hot</div> : ''}
            {product.status === 'new' ? <div className='new'>New</div> : ''}
                <img src={product.image} alt="not found" />
            </div>
            <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}.00</div>  
                </div>
            <div className="add-cart" onClick={()=> dispatch({type: 'ADD_TO_CART', id: product.id, product})}>add to cart</div>
            
        </div>
           )})}
    </div>
    </div>
  )
}

export default Products