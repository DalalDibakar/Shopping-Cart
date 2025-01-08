import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from './CartItems'

function CartComponant() {
  const cart = useSelector((state) => state.cart.cart)
  const TotalCart = [...cart]
  const dispatch = useDispatch()

  // cart =[
//   {
//     id:
//     name:
//     image:
//     price:
//     quantity:
//   },
//   ...
// ]

  TotalCart.sort((a, b) => a.id - b.id);
  console.log(cart.map(i => i.quantity*i.price).reduce((accumulator, currentValue) => accumulator + currentValue,0));

  return (
    <div className='bg-slate-100 px-4 pt-8 pb-32 flex flex-col items-center justify-start'>
        <p className='text-3xl font-bold text-center mb-4'>Cart Items</p>
       
        {
            TotalCart.map(item => (
                <div key={item.id} className='w-full flex flex-col items-center px-10 py-2'>
                    <CartItems CartObj={item} />
                </div>
            ))
        }
  
        <div className='w-max px-10 py-6 border border-slate-700 rounded-lg text-center mt-10 bg-slate-300 font-semibold text-xl'>
        Total Price: <span className='text-2xl font-bold'>${Math.round(cart.map(i => Math.round(i.quantity*i.price*100)/100).reduce((accumulator, currentValue) => accumulator + currentValue,0)*100)/100}</span>

        </div>

    </div>
  )
}

export default CartComponant