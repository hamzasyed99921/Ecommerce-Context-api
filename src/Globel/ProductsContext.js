import React, {createContext,useState} from 'react'
import dslr from '../assets/dslr.jpg';
import headphone from '../assets/headphone.jpg';
import iphone from '../assets/iphone.jpg'
import microphone from '../assets/microphone.jpg'
import perfume from '../assets/perfume.jpg'
import ring from '../assets/ring.jpg'
import shoes from '../assets/shoes.jpg'
import watch from '../assets/watch.jpg'

export const ProductsContext = createContext();

function ProductsContextProvider(props) {
    const [products, setProducts] = useState([
        {id: 1 , name: 'Dslr', price: 300, image: dslr, status: 'hot'},
        {id: 2 , name: 'HeadPhones', price: 30, image: headphone, status: 'new'},
        {id: 3 , name: 'Iphone', price: 400, image: iphone, status: 'hot'},
        {id: 4 , name: 'MicroPhone', price: 100, image: microphone, status: 'hot'},
        {id: 5 , name: 'Perfume', price: 20, image: perfume, status: 'new'},
        {id: 6 , name: 'Ring', price: 150, image: ring, status: 'new'},
        {id: 7 , name: 'Shoes', price: 200, image: shoes, status: 'hot'},
        {id: 8 , name: 'Watch', price: 120, image: watch, status: 'new'}
    ]);
  return (
    <>
        <ProductsContext.Provider value={{products: [...products]}}>
            {props.children}
        </ProductsContext.Provider>
    </>
  )
}

export default ProductsContextProvider