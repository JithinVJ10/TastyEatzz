import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance'
import { useSelector } from 'react-redux'

const CurrentOrder = () => {
  const [orders, setOrders] = useState([])

  const {riderCred} = useSelector((state)=> state.rider)

  useEffect(()=>{
    axiosInstance.get(`/rider/CurrentOrder/${riderCred._id}`).then((res)=>{
      if (res.data.success) {
        setOrders(res.data.order)
      }
    }).catch((error)=>{
      console.log(error)
    })
  })
  return (
    <>
      <div className='w-4/5 p-4 bg-emerald-300 border rounded-lg'>
      <div>
        <h1 className='font-bold text-2xl'>Current Order</h1>
      </div>
      <div>
        {
            orders ? 
            <>
            {
              orders?.map((order)=>{
                return (
                  <div className='m-3 flex justify-between border-2 '>
                      <div className='p-3'>
                        {
                          order?.items.map((item,index)=>{
                            return (
                              <>
                                <div className='flex'>
                               <p className="mt-2 text-lg font-bold text-fuchsia-700 px-2">{index+1}.{item?.product.name}</p>
                               <p className="mt-2 font-light">x{item?.quantity}</p>
                               <p className="mt-2 font-semibold px-2">Price - ₹{item?.price * item?.quantity}</p>
                               <p className="mt-2 font-semibold px-2">|| Hotel Name :{item?.hotelId?.hotelName}</p>
                               </div>
                              </>
                            )
                          })
                        }
                       
                      <p >Pickup: {order?.pickUpAddress[0]?.address}</p>
                      <p>Delivery To : {order?.DeliveryAddress?.name} , {order?.DeliveryAddress?.address} ,
                       {order?.DeliveryAddress?.mobile}
                      </p>
                      </div>
                      
                  </div>
                  
                )
              })
            }
            
            </> : <p>No Orders</p>
        }
        
      </div>
    </div>
    </>
  )
}

export default CurrentOrder
