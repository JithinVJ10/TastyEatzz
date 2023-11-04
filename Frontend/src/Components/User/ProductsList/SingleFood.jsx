import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import {FaCartArrowDown} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify'

const SingleFood = () => {
  const [quantity,setQuantity] = useState(1)
  const [price,setPrice] = useState(259)
  const [product,setProduct] = useState()

  const {id} = useParams()

  const {userCred} = useSelector((state)=> state.user)

  useEffect(()=>{
    try {
      if (id) {
        axiosInstance.get(`/getSingleProduct/${id}`).then((res)=>{
          if (res.data.product) {
            setProduct(res.data.product)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  },[])

  const quantityIncrease = ()=>{
      setQuantity(quantity+1)
  }

  const quantityDecrease = ()=>{
      if (quantity>1) {
          setQuantity(quantity-1)
      }
  }

  const addTocart = async ()=>{
    try {
      const res = await axiosInstance.post(`/addTocart/${product._id}`,{userCred,quantity})

      if (res.data.success) {
        console.log(res.data.message);
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error);
    }
  }

  return (
    <div className='px-20'>
    <ToastContainer/>
    <h2 className="company uppercase text-orange font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
      {product?.hotelName.hotelName}
    </h2>
    <img 
    className='rounded py-3'
    src={product?.imageUrl[0]} 
    alt="food Item" width={300} />
    <h3  className="product capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl sm:leading-none pb-3">
      {product?.name}  
    </h3>
    <p className="text-dark-grayish-blue pb-6 lg:pt-2 lg:leading-6">
      {product?.cuisineType?.name} Cuisine
    </p>
    <p className="text-dark-grayish-blue pb-3 lg:py-3 lg:leading-6">
      These low-profile sneakers are your perfect casual
       wear companion. Featuring a durable rubber outer
       sole, they'll withstand everything the weather
       can offer.
    </p>
    <div className="amount font-bold flex items-center justify-between lg:flex-col lg:items-start mb-6">
      <div className="discount-price items-center flex">
        <div  className="price text-3xl">₹{product?.price}</div>
        <div className="discount text-orange bg-pale-orange w-max px-2 rounded mx-5 h-6">
          50%
        </div>
      </div>
      <div className="original-price text-grayish-blue line-through lg:mt-2">
        $250.00
      </div>
    </div>
    <div className="sm:flex lg:mt-8 w-full">
    <div className="flex items-center border-gray-100 px-10">
       <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
       onClick={()=>quantityDecrease()}
       > 
       - 
       </span>
       <input className="h-8 w-8 border bg-white text-center text-xs outline-none" 
       type="number" 
       value={quantity}
       onChange={(e)=>setQuantity(e.target.value)}
       min="1" 
       />
       <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
       onClick={()=>quantityIncrease()}> 
       + 
       </span>
    </div>

      <button 
      onClick={()=>addTocart()}
      className="cart w-28 h-14 bg-orange-500 rounded-lg lg:rounded-xl mb-2 shadow-orange-shadow shadow-2xl  flex items-center justify-center lg:w-1/5 hover:opacity-60"
      >
        <FaCartArrowDown className='mx-2 text-xl'/>
        Add to cart
      </button>
    </div>

    </div>
  )
}

export default SingleFood