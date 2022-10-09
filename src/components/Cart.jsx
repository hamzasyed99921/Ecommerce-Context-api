import React, {useContext} from 'react'
import { CartContext } from '../Globel/CartContext'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure();

const Cart = (props) => {
  const navigate = useNavigate();
  const {shoppingCart, totalPrice, qty, dispatch} = useContext(CartContext);
  // console.log(shoppingCart)
  const handleToken = async(token) => {
    // console.log(token)
    const product = {name: "All products", price: totalPrice} 
    const response = await axios.post("http://localhost:8080/checkout", {
      product,
      token
    })
    // console.log(response)

    const {status} = response.data;
    if (status === 'success') 
    {
        dispatch({type: 'EMPTY'});
        navigate('/');
        toast.success("You have paid successfully now you can continue your shopping", {position: toast.POSITION.TOP_RIGHT })
    }
  }
  return (
    <div className="cart-container">
<div className="cart-details">
    {shoppingCart.length > 0 ? 
  shoppingCart.map(cart => (
   
    <div className="cart" key={cart.id}>
      <span className="cart-image"><img src={cart.image} alt="not found" /></span>
      <span className="cart-product-name">{cart.name}</span>
      <span className="cart-product-price">${cart.price}.00</span>
      <span className="inc" onClick={() => dispatch({type: 'INC' , id: cart.id, cart})}><AddCircleIcon/></span>
      <span className="product-quantity">{cart.qty}</span>
      <span className="dec" onClick={() => dispatch({type: 'DEC' , id: cart.id, cart})}><RemoveCircleIcon/></span>
      <span className="product-total-price">${cart.price * cart.qty}.00</span>
      <span className="delete-product" onClick={() => dispatch({type: 'DELETE' , id: cart.id, cart})}><DeleteIcon/></span>
    </div>
  ))  
  : 'sorry your cart is empty'}
</div>
    {shoppingCart.length > 0 ? <div className="cart-summary">
        <div className="summary">
          <h3>Cart Summary</h3>
          <div className="total-items">
              <div className="items">Total items</div>
              <div className="items-count">{qty}</div>
          </div>
            <div className="total-price-section">
              <div className="just-title">Total price</div>
              <div className="items-price">${totalPrice}.00</div>
            </div>
            <div className="stripe-section">
                <StripeCheckout
                  stripeKey='pk_test_51KskcfFtVmt0o38Ay8nJ7n3TjTEBWT2SHOULcsbOdp4P1ZtOkXIrcFBneUZ7GIL7fvmq4PRDTmUs6NkoXFYfFUF100MZZm7Td6'
                  token={handleToken}
                  billingAddress
                  shippingAddress
                  amount={totalPrice * 100}
                  name='All products'
                  >

                </StripeCheckout>
            </div>
        </div>
    </div> : ''}
</div>
  )
}

export default Cart