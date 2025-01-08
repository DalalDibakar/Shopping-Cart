import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { IoIosArrowDown } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import Serachbar from "./Serachbar";
import { useSelector } from "react-redux";


function Navbar() {

  const ItemsTotal = useSelector((state) => state.cart.totalItems)
  const [navcatagories, setNavcatagories] = useState([])
  const [loading, setLoading] = useState(false)

  let fetchCatagries = async () =>{
    try {
      setLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      console.log(response.data);
      setNavcatagories(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error.message);
  }
}

useEffect(() => {
  const Catagory = JSON.parse(sessionStorage.getItem('catagory'))
  console.log(Catagory);
  Catagory ? setNavcatagories(Catagory) : fetchCatagries()
}, [])

useEffect(() => {
  sessionStorage.setItem(`catagory`, JSON.stringify(navcatagories))
}, [navcatagories])


  return ( 
    <nav className="sticky top-0 flex justify-evenly bg-teal-800 w-screen h-[60px] pl-3 pr-3 pt-2 pb-2 z-10 shadow-2xl">
      <NavLink to={"/"}>
        <img
          src="https://i.pinimg.com/originals/a3/2b/19/a32b19c33d4a36e69069493a0353e531.png"
          alt="logo"
          className="h-full w-24 object-cover scale-125"
          loading="lazy"
        />
      </NavLink>

      {/* <Serachbar /> */}

      <div className="flex justify-between items-center w-56 text-gray-400 ">
        <NavLink
          to={"/"}
          className={({ isActive }) => isActive ? "text-white" : "hover:text-gray-300"}
        >
          <div className="">Home</div>
        </NavLink>

        <div id="catagory-div" className=" flex px-2 w-max relative cursor-pointer group h-[100%] " >
          <div className="text-gray-400 active:text-white flex items-center justify-center group-hover:text-gray-300">Catagories</div> 
          <div className="flex items-center justify-center translate-x-1 translate-y-[2px] group-hover:text-gray-300"><IoIosArrowDown /></div>
          <div className="hidden w-[15px] h-[15px] bg-white rotate-45 absolute top-[38px] right-[5px] group-hover:block border-black shadow-2xl"></div>
          <ol id="Nav-drop-menu" className="hidden bg-white flex-col content-between gap-2 w-[150%] absolute top-[40px] -left-3 py-[4px] rounded-md border-1 text-black border-black shadow-xl transition ease-in duration-1000  group-hover:flex ">
            {loading ? (<p className="text-center">Loading...</p>):
            (navcatagories.map((item)=>(
              <NavLink key={item} to={`/category/${item}`} className={({ isActive }) => isActive ? "bg-yellow-700 text-white" : "hover:bg-gray-200 " }><li key={item} className="flex items-center w-max mx-[16px] py-[6px]">{item.split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")}</li></NavLink>

            )))}
          </ol>
        </div>

        <NavLink
            to={"/cart"}
            className={({ isActive }) => (isActive ? "text-white" : "hover:text-gray-300")}
          >
          <div className="flex w-max gap-1 group">
            <div>Cart</div>
            <div className="relative flex justify-center items-center">
              <FaCartShopping />
              {
                ItemsTotal !== 0 && <div className="w-[0.5rem] h-[0.5rem] rounded-full bg-orange-600 text-white font-semibold flex justify-center items-center text-base p-[0.7rem] absolute top-[-0.95rem] left-[0.6rem]">
                {
                  ItemsTotal
                }
                </div>
              }
            </div>
          </div>  
          </NavLink>  
        </div>
    </nav>

  );
}

export default Navbar;
