import React from 'react'
import { FiSearch } from "react-icons/fi";

function Serachbar() {
  

  return (
    <div className="w-[40%] m-[6px] relative flex">
        <FiSearch className="absolute top-[0.6rem] scale-[105%] left-2 text-gray-500"/>
        <input
          type="text"
          className="w-[100%] h-[100%] px-8 py-2 rounded-md text-lg"
          placeholder="Search Product"
        />
    </div>
  )
}

export default Serachbar