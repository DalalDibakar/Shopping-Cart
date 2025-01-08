import React from "react";
import images from "../data/images";
import CustomSlider from "../Components/custom.slider";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [navcatagories, setNavcatagories] = useState([]);
  const [loading, setLoading] = useState(false);

  let fetchCatagries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      console.log(response.data);
      setNavcatagories(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

useEffect(() => {
  const Catagory = JSON.parse(sessionStorage.getItem('hcatagory'))
  console.log(Catagory);
  Catagory ? setNavcatagories(Catagory) : fetchCatagries()
}, [])

useEffect(() => {
  sessionStorage.setItem(`hcatagory`, JSON.stringify(navcatagories))
}, [navcatagories])


  return (
    <div id="wrapper" className="flex flex-col w-screen gap-16">
      <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>

      <div id="Browse Catrgories" className=" h-max flex flex-col justify-center items-center sticky top-0 bg-gray-100">
        <div className="text-3xl font-bold text-gray-700 sticky top-0 mt-3">
          Browse Catrgories
        </div>
        <div id="catagory-card" className=" flex justify-center items-center gap-x-10 gap-y-1 w-[100%] px-10 pt-4 pb-1 flex-wrap ">
          {loading ? (<p className="text-center ">Loading...</p>):
          (
            <>
              <Link to={'/'}>
                <div className=" text-xl font-bold border border-solid bg-gray-200 border-gray-300 w-64 text-center py-3 shadow-2xl rounded-lg hover:bg-gray-300">
                  All
                </div>
              </Link>
              {
                navcatagories.map((item,index)=>(
                  <Link key={index} to={`/${item}`}>
                    <div className="text-xl font-bold border border-solid bg-gray-200 border-gray-300 w-64 text-center py-3 shadow-2xl rounded-lg hover:bg-gray-300">
                      {item.split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")}
                    </div>
                  </Link>
                ))
              }
            </>
          )}
        </div>
      </div>

      <div id="Products-items" className="">
        <Outlet />
      </div>
    </div>
    
  );
}

export default Home;
