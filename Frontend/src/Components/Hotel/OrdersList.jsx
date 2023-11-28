import React, { useEffect, useState } from 'react'
import {axiosInstance} from '../../api/axiosInstance'
import EditDeliveryStatus from './EditDeliveryStatus'

const OrdersList = () => {
    const [orders, setOrders] = useState()
    const [showModal, setShowModal] = useState(false)
    const [selectedOrder, setSelectedOrder]= useState({
      orderId:'',
      orderStatus:""
    })

    useEffect(()=>{
        axiosInstance.get(`/hotel/getOrders`).then((res)=>{
            if (res.data.success) {
                setOrders(res.data.orderDetails)
                console.log(res.data.orderDetails)
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[orders])

    const EditStatus = (orderId, orderStatus)=>{
      setSelectedOrder({
        orderId,
        orderStatus
      })
      setShowModal(true)
    }


  return (
    <>
      <main className='main-container'>
        <EditDeliveryStatus showModal={showModal} setShowModal={setShowModal}  selectedOrder={selectedOrder}/>
      <div className="flex justify-between items-start">
        <p className="text-4xl mb-8 font-extrabold text-yellow-950">Orders</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Food item
              </th>
              
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               Hotel
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
               User
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Total
              </th>
              
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Change Status
              </th>
              
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => {
              return (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    {
                       order?.items.map((item,index)=>{
                            return (
                              <>
                               <div className='flex'>
                               <p className="mt-2 text-lg font-bold text-fuchsia-700 px-2">{index+1}.{item?.product.name}</p>
                               <p className="mt-2 font-light">x{item?.quantity}</p>
                               <p className="mt-2 font-semibold px-2">Price - ₹{item?.price * item?.quantity}</p>
                               </div>
                                   
                              </>
                               )
                            })
                    } 
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    {
                       order?.items.map((item,index)=>{
                            return (
                              <>
                               <p className="mt-2 font-semibold px-2"> {item?.hotelId?.hotelName}</p>
                                   
                              </>
                               )
                            })
                    } 
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <p className="mt-2 font-semibold px-2">{order?.userId}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <p className="mt-2 font-semibold px-2">{order?.status}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <p className="mt-2 font-semibold px-2">₹{order?.total}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                     <button onClick={()=>EditStatus(order?._id,order?.status)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Change Status
                     </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
    </>
  )
}

export default OrdersList
