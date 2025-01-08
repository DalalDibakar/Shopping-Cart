import './App.css';
import { Route, Routes } from "react-router-dom"
import Navbar from './Components/Home/Navbar';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import Error from './Pages/Error';
import Product from './Pages/Product';
import SingleItem from './Pages/SingleItem';
import Footer from './Components/Footer';
import { useState } from 'react';

function App() {
const [showlabel, setShowLabel] = useState(true)

  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden bg-gray-100">
      {
        showlabel &&
        <div className='w-[100%] p-2 bg-sky-600 text-white text-center font-semibold text-lg relative'>
          Enjoy flat 60% off on first order. Hurry up !
          <div div className='absolute top-2 right-2 px-2 cursor-pointer hover:text-red-400' onClick={() => setShowLabel(false)}>X</div>
        </div>
      }
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} >
          <Route index  element={<Products/>} />
          <Route path='/:catagoryId' element={<Product/>} />
        </Route>
        <Route path="/products" element={<Products/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/category/:catagoryId" element={<Product/>} />
        <Route path="/product/:productId" element={<SingleItem/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
