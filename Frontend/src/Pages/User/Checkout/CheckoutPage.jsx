import React, { useEffect, useState } from 'react'
import Header from '../../../Components/User/Header/Header'
import Footer from '../../../Components/User/Footer/Footer'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../../api/axiosInstance'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ORDER_PLACED } from '../../../RoutePaths/RoutePaths'


const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState()
    const [subTotal,setSubTotal] = useState(0)
    const {id} = useParams()
  
    const [address,setAddress] = useState()
    const { userCred } = useSelector((state)=> state.user)
    const userId = userCred._id

    const navigate = useNavigate()


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

        try {
          axiosInstance.get(`/getSelectedAddress/${userId}`).then((res)=>{
            if (res.data.success) {
              let UserAddress = res.data.userAddress
              let selectdAddress = UserAddress.find((addr) => addr._id === id)
              if (selectdAddress) {
                setAddress(selectdAddress)
              }
            }else{
              console.log('failed to fetch');
            }
          })
        } catch (error) {
          console.log(error)
        }
      },[cartItems,address]);

      const [selectedPayment, setSelectedPayment] = useState('');

      const handleRadioChange = (event) => {
        setSelectedPayment(event.target.value);
        console.log(selectedPayment)
      };

      const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
          const res = await axiosInstance.post("/placeOrder",{userId,cartItems,address,subTotal,selectedPayment})
          if (res.data.success) {
            toast.success(res.data.message)
            navigate(ORDER_PLACED)
          }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <>
    <Header/>
    
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <p className="text-2xl font-bold text-gray-800">Checkout</p>

        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
             {
                cartItems?.products?.map((food)=>{
                    return (

                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={food?.productId?.imageUrl[0]} alt="" />
                        <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">{food?.productId?.name}</span>
                        
                        <p className="text-lg font-bold">{food?.productId?.price} x {food?.quantity} - ₹{food?.productId?.price * food?.quantity}</p>
                        </div>
                    </div>
                    )
                })
             }   
            </div>

            <p className="mt-8 text-lg font-medium">Delivery Address</p>
            <div className="mt-5 grid gap-6">
            <div className="relative">
                <div className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex select-none rounded-lg border border-gray-300 p-4">
                    <div className="ml-5">
                        <p className="mt-2 font-semibold">{address?.name}</p>
                        <p className="mt-2 font-semibold">{address?.address}</p>
                        <p className="mt-2 font-semibold">{address?.city}</p>
                        <p className="mt-2 font-semibold">{address?.pincode}</p>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit}>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div className="">
            


            <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Payment Method</label>
            
            
            <div className="relative">
        <input
          className="peer hidden"
          id="cashondelivery"
          type="radio"
          name="payment"
          value="cashondelivery"
          checked={selectedPayment === 'cashondelivery'}
          onChange={handleRadioChange}
        />
        <span className={`peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white ${selectedPayment === 'cashondelivery' ? 'bg-gray-700' : ''}`}></span>
        <label
          className={`peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${selectedPayment === 'cashondelivery' ? 'bg-gray-50' : ''}`}
          htmlFor="cashondelivery"
        >
          <div className="ml-5">
            <span className="mt-2 font-semibold">Cash On Delivery</span>
          </div>
        </label>
      </div>

     
      {/* <div className="relative">
        <input
          className="peer hidden"
          id="creditcard"
          type="radio"
          name="payment"
          value="creditcard"
          checked={selectedPayment === 'creditcard'}
          onChange={handleRadioChange}
        />
        <span className={`peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white ${selectedPayment === 'creditcard' ? 'bg-gray-700' : ''}`}></span>
        <label
          className={`peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${selectedPayment === 'creditcard' ? 'bg-gray-50' : ''}`}
          htmlFor="creditcard"
        >
          <div className="ml-5">
            <span className="mt-2 font-semibold">Credit Card</span>
          </div>
        </label>
      </div> */}
           
           

            <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">₹{subTotal}</p>
                </div>
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Devlivery Charge</p>
                <p className="font-semibold text-gray-900">₹ 0</p>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">₹{subTotal}</p>
            </div>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
        </form>
        </div>
        <Footer/>
    </>
  )
}

export default CheckoutPage
