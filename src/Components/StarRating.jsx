import React from 'react'
import { MdStarRate } from "react-icons/md";

function StarRating({rating, count}) {
  return (
    <div className='flex gap-2 mb-4'>
        <div id='rating' className='bg-green-700 text-white py-[0.05rem] px-1 flex justify-center items-center gap-1 rounded-md font-semibold'>
            <div>{rating}</div>
            <MdStarRate />
        </div>
        <div className='font-semibold text-gray-400 '>{count} Reviews</div>
    </div>
  )
}

export default StarRating