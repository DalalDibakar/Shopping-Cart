import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../Components/Home/ItemCard'
import { useParams } from 'react-router-dom'

function Product() {
  const { catagoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`https://fakestoreapi.com/products/category/${catagoryId}`)
      console.log(response.data)
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const Product = JSON.parse(sessionStorage.getItem(`${catagoryId}Products`))
    console.log(Product);
    Product ? setProducts(Product) : fetchData()
  },[catagoryId])

  useEffect(() => {
    sessionStorage.setItem(`${catagoryId}Products`, JSON.stringify(products))
  }, [products])
  

  return (
    <div id='product-box-container' className='w-[100%] px-30 pb-12 h-max mb-10'>
    <p className='text-3xl font-bold text-center mb-6'>Products from - {catagoryId.split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")}</p>
    {
      loading ? (<p className="text-center ">Loading...</p>)
      :(
        <div id="flex-container" className='flex justify-center flex-wrap gap-x-6 gap-y-4 h-max '>
          {
            products.map((item,index) => (
              <Link to={`/product/${item.id}`} key={item.id} className='w-56 rounded-lg p-4 h-[100%] hover:shadow-[rgba(0,0,0,0.3)_8px_8px_15px_0px]'>
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

export default Product