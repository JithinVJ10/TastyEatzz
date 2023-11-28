import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../api/axiosInstance'
import { ToastContainer, toast } from 'react-toastify'

const EditDeliveryStatus = ({showModal,setShowModal, selectedOrder}) => {
    const [deliveryStatus, setDeliveryStatus] = useState()

    

    const handleSubmit = async(e)=>{
      e.preventDefault()
        try {
            let OrderId = selectedOrder.orderId
            const res = await axiosInstance.post(`/hotel/updateDeliveryStatus/${OrderId}`,{deliveryStatus})
            if (res.data.success) {
              toast.success(res.data.message)
              setShowModal(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      {showModal ? (
        <>
        <ToastContainer/>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Food Items
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="m-3">
                <form onSubmit={handleSubmit}>
                    <select 
                    value={selectedOrder.orderStatus}
                    name='category'
                    id='category'
                    onChange={(e)=> setDeliveryStatus(e.target.value)}
                    required
                    >
                        <option value={deliveryStatus} selected>{deliveryStatus}</option>
                        <option value={'Pending'} >Pending</option>
                        <option value={'Delivered'} >Delivered</option>
                        <option value={'onDelivery'} >onDelivery</option>

                    </select>
                        <p>{deliveryStatus}</p>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
                </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default EditDeliveryStatus
