import React from 'react'
import Button from '../Button'
import StarRating from '../StarRating'

function ItemCard({product}) {
  return (
    <div id='item-container'>
      <div id='img-container' className='mb-8 '>
        <img className='h-40 w-[100%] object-contain ' src={`${product.image}`}/>  
      </div>
      <StarRating rating={product.rating.rate} count={product.rating.count} /> 
      <p className='mb-4 text-center font-medium text-xm truncate'>{product.title}</p>  
      <p className='mb-4 text-center font-medium text-sm truncate'>{product.category.split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")}</p>
      <p className='mb-4 text-center font-medium text-2xl truncate'> ${product.price}</p>  
       
    </div>
  )
}

export default ItemCard