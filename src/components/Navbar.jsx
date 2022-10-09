import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { CartContext } from '../Globel/CartContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Navbar = () => {

  const {qty} = useContext(CartContext);

  return (
    <>
        <nav>
            <ul className='left'>
                <li><Link to="/">PakExpress</Link></li>
            </ul>
            <ul className='right'>
                <li><Link to="/cart"><span className='shoppingCart'><AddShoppingCartIcon id='icon'/><span className='cartCount'>{qty}</span></span></Link></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar