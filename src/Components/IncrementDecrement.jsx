import React from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseInQuantity, increaseInQuantity } from '../Redux/Slices/CartSlice'

function IncrementDecrement({id}) {
  const cart_items = useSelector((state) => state.cart)
  const dispatch = useDispatch()  


  return (
    <div className='flex w-max gap-3'>
        <Button bgcolour={"bg-slate-700 hover:bg-green-500 "} text={"+"} onClickFunc={() => dispatch(increaseInQuantity(id))}/>
        <input type='text' readOnly value={cart_items.cart.filter(p => p.id === id)[0].quantity}  className='w-20 py-2 px-4 rounded-md text-lg font-semibold text-center bg-slate-200'/>
        <Button bgcolour={"bg-slate-700 hover:bg-red-500 "} text={"-"} onClickFunc={() => dispatch(decreaseInQuantity(id))}/>
    </div>
  )
}

export default IncrementDecrement