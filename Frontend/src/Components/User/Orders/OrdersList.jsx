import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance'
import { useSelector } from 'react-redux'

const OrdersList = () => {
    const [orders, setOrders] = useState()

    const {userCred} = useSelector((state)=> state.user)

    useEffect(()=>{
        axiosInstance.get(`/getOrders/${userCred._id}`).then((res)=>{
            if (res.data.success) {
                setOrders(res.data.orderDetails)
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const handleClick = async (orderId)=>{
        try {
            
        } catch (error) {
            
        }
    }

  return (
    <>
    {
        orders? (
            <>
            <div className='p-4'>
                <p className='text-center text-2xl font-bold'>Orders</p>
                {
                    orders?.map((order)=>{
                        return (
                            <div onClick={handleClick(order._id)} className="flex rounded-lg border p-4 mt-5 shadow-md">
                                
                                <div className="ml-5">
                                    <div className="mt-2 font-semibold"> 
                                    {
                                        order?.items.map((item,index)=>{
                                            return (
                                                <>
                                                <div className='flex'>
                                                <p className="mt-2 text-lg font-bold text-fuchsia-700 px-2">{index+1}.{item?.product.name}</p>
                                                <p className="mt-2 font-light">x{item?.quantity}</p>
                                                <p className="mt-2 font-semibold px-2">Price - ₹{item?.price * item?.quantity}</p>
                                                <p className="mt-2 font-semibold px-2">|| Hotel: {item?.hotelId?.hotelName}</p>
                                                </div>
                                                    
                                                </>
                                            )
                                        })
                                    } 
                                    </div>
                                    
                                    <p className="mt-2 font-semibold px-2">Status: {order?.status}</p>
                                    <p className="mt-2 font-semibold px-2">Payment Method: {order?.paymentMethod}</p>
                                    <p className="mt-2 font-semibold px-2">Total: {order?.total}</p>
                                </div>
                            </div>
                        )
                    })
                }
            
            </div>
            </>
        ): <p className='text-center mt-10'> No Order Data</p>
    }
    
    </>
  )
}

export default OrdersList
