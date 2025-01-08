import React from 'react'
import { useDispatch } from 'react-redux'
import IncrementDecrement from '../IncrementDecrement'
import { removeFromCart } from '../../Redux/Slices/CartSlice'
import Button from '../Button'
import { Link } from 'react-router-dom'

function CartItems({CartObj}) {
  const dispatch = useDispatch()


  return (
    <div className='w-11/12 px-15  py-2 border border-slate-700 rounded-lg flex justify-around flex-wrap gap-5'>
        <Link to={`/product/${CartObj.id}`} className='flex gap-8'>
            <div className='hidden md:block bg-white h-[4rem] w-[4rem]  '>
                <img className='w-full h-full object-contain ' src={`${CartObj.image}`} alt="logo" loading='lazy'/>
            </div>
            <div className='w-60 flex justify-start items-center font-semibold '>
                {CartObj.name}
            </div>
        </Link>
        <div className='flex justify-center items-center'>
            <IncrementDecrement id={CartObj.id} />
        </div>
        <div className='flex justify-center items-center'>
            <Button bgcolour={"bg-red-800 hover:bg-red-500 "} text={"Remove"} onClickFunc={() => dispatch(removeFromCart(CartObj.id))}/>
        </div>
        <div className='flex justify-center items-center font-semibold text-2xl'>
            ${Math.round(CartObj.price*CartObj.quantity*100)/100}
        </div>

    </div>
  )
}

export default CartItems