import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../Components/Button'
import StarRating from '../Components/StarRating'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../Redux/Slices/CartSlice'
import IncrementDecrement from '../Components/IncrementDecrement'


function SingleItem() {
  const CartItems = useSelector((state) => state.cart)
  const {productId} = useParams()
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(true)
  //console.log(productId);
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`https://fakestoreapi.com/products/${productId}`)
      setItem(res.data)
      // console.log(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [productId])
  
  const cart_obj = {
    id: item.id,
    image:item.image,
    name: item.title,
    image: item.image,
    price: item.price,
    quantity: 1
  }

  return (
    <div>
    {
      loading ? (<div className="flex justify-center items-center h-screen ">Loading ...</div>):
      (
        <div className='flex flex-wrap justify-center px-10 py-16 gap-x-10 h-full'>
         <div id='prod-image' className='bg-white py-5 h-[25rem] w-[35rem] rounded-lg shadow-[rgba(0,0,0,0.3)_8px_20px_15px_0px] mb-5'>
            <img className='h-[100%] w-[100%] object-contain ' alt='logo' src={`${item.image}`} loading='lazy'/>  
         </div>
          <div id='prod-details' className='py-5 w-[35rem] relative '>
            <h1 id='header' className='text-4xl font-semibold font-serif mb-4'>{item.title}</h1>
            <StarRating rating={item.rating.rate} count={item.rating.count} /> 
            <p id='desc' className='text-lg font-sans mb-4'>{item.description}</p>
            <h2 id='price' className='text-3xl font-semibold mb-4 '>Price: ${item.price}</h2>
            <div className='flex w-max gap-6 justify-between'>
              {
                !CartItems.onlyids.includes(item.id) && <Button bgcolour={"bg-gray-700 hover:bg-slate-500 "} text={"Add To Cart"} onClickFunc={() => dispatch(addToCart(cart_obj))}/>
              }
              {
                CartItems.onlyids.includes(item.id) && <IncrementDecrement id={cart_obj.id}/>
              }
              {
                CartItems.onlyids.includes(item.id) && <Button bgcolour={"bg-red-800 hover:bg-red-500 "} text={"Remove From Cart"} onClickFunc={() => dispatch(removeFromCart(cart_obj.id))}/>
              }
              
            </div>
            
          </div>
        </div>
      )
    }
    </div>
  )
}

export default SingleItem