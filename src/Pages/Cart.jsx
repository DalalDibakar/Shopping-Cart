import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartComponant from '../Components/Cart/CartComponant'

function Cart() {
  const CartItems = useSelector((state) => state.cart)

  return (
    <div>
      {
        CartItems.total === 0 ? (<div className='flex justify-center items-center text-2xl font-bold py-12'> No Items in Cart</div>):
        (
          <CartComponant />
        )
      }
    </div>
  )
}

export default Cart