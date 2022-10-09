import './App.css';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import CartContextProvider from './Globel/CartContext'
import ProductsContextProvider from './Globel/ProductsContext';
import Products from './components/Products';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
function App() {
  return (
    <>
      <ProductsContextProvider >
        <CartContextProvider>
       < BrowserRouter>
      <Navbar/>
      <Banner/>
        <Routes>
          <Route path='/' exact element={<Products />}/>
          <Route path='/cart' exact element={<Cart />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
       </BrowserRouter>
       </CartContextProvider>
      </ProductsContextProvider>

    </>
  );
}

export default App;
