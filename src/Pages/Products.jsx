import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../Components/Home/ItemCard'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      let response = await axios.get('https://fakestoreapi.com/products')
      console.log(response.data)
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const LatestProducts = JSON.parse(sessionStorage.getItem('LatestProducts'))
    console.log(LatestProducts);
    LatestProducts ? setProducts(LatestProducts) : fetchData()

  }, [])

  useEffect(() => {
    sessionStorage.setItem('LatestProducts', JSON.stringify(products))
  }, [products])
  


  return (
    <div id='product-box-container' className='w-[100%] px-60 pb-8 h-max'>
    <p className='text-3xl font-bold text-center mb-6'>All Products</p>
    {
      loading ? (<p className="text-center ">Loading...</p>)
      :(
        <div id="grid-container" className='grid grid-cols-1 grid-rows-20 gap-x-6 gap-y-4 h-max xl:grid-cols-4 xl:grid-rows-5 lg:grid-cols-3 lg:grid-rows-7 md:grid-cols-2 md:grid-rows-10 mb-10'>
          {
            products.map((item,index) => (
              <Link to={`/product/${item.id}`} key={item.id} className=' rounded-lg p-4 h-[100%] hover:bg-white hover:shadow-[rgba(0,0,0,0.3)_8px_8px_15px_0px]'>
                <ItemCard product={item} />
              </Link>
            ))
          }
        </div>
      )
    }
 
    </div>
  )
}

export default Products