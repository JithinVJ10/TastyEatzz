import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { CHECKOUT_ADDRESS } from '../../../RoutePaths/RoutePaths'
import {FaTrash} from 'react-icons/fa'
import swal from 'sweetalert'

const Cart = () => {
    
    const [cartItems, setCartItems] = useState()
    const [subTotal,setSubTotal] = useState(0)
    const { userCred } = useSelector((state)=> state.user)
    

    
    const userId = userCred._id

    
    const subTotalUpdate = async () => {
      try {
        if (cartItems && cartItems.products) {
          const subTotal = cartItems.products.reduce((accumulator, item) => {
            return accumulator + item.productId.price * item.quantity;
          }, 0);
          setSubTotal(subTotal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      try {
        axiosInstance.get(`/getCart/${userId}`).then((res) => {
          if (res.data.userCart) {
            // Assuming the response contains an array of cart items
            setCartItems(res.data.userCart); // Update the state with the retrieved cart items 
          }
        }).catch((error) => {
          console.log(error);
        });
        subTotalUpdate()
      } catch (error) {
        console.log(error);
      }
    }, [cartItems]);

    

    const quantityIncrease = async (foodId) => {
      try {
        const res = await axiosInstance.patch('/quantityIncrease',{foodId,userId})
        if (res.data.success) {  
          const updatedCartItems = {
            ...cartItems,
            products: cartItems.products.map((item) => {
              if (item.productId._id === foodId) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          };
          setCartItems(updatedCartItems);
          
        }
        subTotalUpdate()
      } catch (error) {
        console.log(error);
      }
    };
    
    const quantityDecrease = async (foodId) => {
      try {
        const res = await axiosInstance.patch('/quantityDecrease',{foodId,userId})
        if (res.data.success) {
          const updatedCartItems = {
            ...cartItems,
            products: cartItems.products.map((item) => {
              if (item.productId._id === foodId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
          };
          setCartItems(updatedCartItems);
          
        }
        subTotalUpdate()
      } catch (error) {
        console.log(error);
      }
    };

    const handleItemRemove = (foodId)=>{
      try {
        swal({
          title: "Are you sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            removeItem(foodId)
          } else {
            swal({title: `Cancelled`});
          }
        });
      } catch (error) {
        console.log(error)
      }
    }

    const removeItem = async(foodId)=>{
      try {
        const res = await axiosInstance.put(`/deleteCartItem`,{userId,foodId})

        if (res.data.success) {
          swal(res.data.message, {
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error)
      }
    }


    

  return (
    <>
    <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    {cartItems ? (
      <>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

        {/* items */}
        <div className="rounded-lg md:w-2/3">
        {
          cartItems?.products?.map((food)=>{
            return (
              
              <div key={food?.productId?._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={food?.productId?.imageUrl[0] } alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900"> {food?.productId?.name} </h2>
                    <p className="mt-1 text-xs text-gray-700">{food?.productId?.catagory?.name}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={()=>quantityDecrease(food?.productId?._id)}
                      > 
                      - 
                      </span>
                      <input className="h-8 w-8 border bg-white text-center text-xs outline-none" 
                      type="number" 
                      value={food.quantity}
                      onChange={(e)=>setQuantity(e.target.value)}
                      min="1" 
                      />
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={()=>quantityIncrease(food?.productId?._id)}> 
                      + 
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      
                      <p className="text-sm"> ₹{food?.productId?.price * food?.quantity} </p>
                      <FaTrash onClick={()=>handleItemRemove(food?.productId?._id)}/>
                    </div>
                  </div>
                </div>
              </div>
              
            )
          })
        }
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹{subTotal}</p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div> */}

          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">₹{subTotal}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to={CHECKOUT_ADDRESS}>
            <button 
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </button>
          </Link>
        </div>
      </div>
      </>
    ) : <div><p className='text-center text-lg font-bold'>Empty Cart</p></div>

    }
    
  </div>
    </>
  )
}

export default Cart
