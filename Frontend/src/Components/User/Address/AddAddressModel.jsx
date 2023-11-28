import React, { useState } from 'react'
import {axiosInstance} from '../../../api/axiosInstance'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

const AddAddressModel = ({showModal,setShowModal}) => {
  const [addressData, setAddressData] = useState({
    name:'',
    address:"",
    city:"",
    state:"",
    mobile:null,
    pincode:null,
  })

  const [err,setErr] = useState()

  const {userCred} = useSelector((state)=> state.user)
  

    const handleInputChange =(e)=>{
      try {
        const {name, value} = e.target

        setAddressData({
          ...addressData,
          [name]:value,
        })

      } catch (error) {
        console.log(error)
      }
    }

    const handleSubmit = async (event)=>{
      event.preventDefault()
      try {
        // const spaceRegex = /^\S*$/;
        // if (!spaceRegex.test(addressData.name) || !spaceRegex.test(addressData.address)  || !spaceRegex.test(addressData.city ) ) {
        //   setErr('Fill field')
        //     setTimeout(()=>{
        //         setErr('')
        //     },2000)

        //     return
        // }

        // if (!spaceRegex.test(addressData.state)  || !spaceRegex.test(addressData.mobile) || !spaceRegex.test(addressData.pincode)) {
        //   setErr('Fill field')
        //     setTimeout(()=>{
        //         setErr('')
        //     },2000)

        //     return
        // }

        const res = await axiosInstance.post(`/addUserAddress/${userCred._id}`,{addressData})

      if (res.data.success) {
        toast.success(res.data.messsage)
        setShowModal(false)
      }
      } catch (error) {
        toast.error(error?.response?.data?.message)
        console.log(error)
      }
      
    }


  return (
    <>
    <ToastContainer/>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Address
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
                        <div className='p-1'>
                            <label htmlFor='name' className=''>Name</label>
                            <input 
                            type="text"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={addressData.name}
                            name='name'
                            id='name'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='address' className=''>Address</label>
                            <input 
                            type="text"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={addressData.address}
                            name='address'
                            id='address'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='city' className=''>City</label>
                            <input 
                            type="text"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={addressData.city}
                            name='city'
                            id='city'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='state' className=''>State</label>
                            <input 
                            type="text"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={addressData.state}
                            name='state'
                            id='state'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='mobile' className=''>Mobile Number</label>
                            <input 
                            type="tel"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={addressData.mobile}
                            name='mobile'
                            id='mobile'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='pincode' className=''>PINCODE</label>
                            <input 
                            type="number"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={addressData.pincode}
                            name='pincode'
                            id='pincode'
                            onChange={handleInputChange}
                            required
                            />
                        </div>

                        <p className='text-red-500 text-center'>{err}</p>
                        
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

export default AddAddressModel
