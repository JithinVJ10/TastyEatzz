import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance'
import { useSelector } from 'react-redux'
import EditAddressModel from '../Address/EditAddress'
import AddAddressModel from '../Address/AddAddressModel'

const ProfileAdress = () => {
  const [address,setAddress] = useState([])
  const [showEditModal,setShowEditModal] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [addressToEdit, setAddressToEdit] = useState()

  const { userCred } = useSelector((state)=> state.user)

  useEffect(()=>{
    try {
        axiosInstance.get(`/getAddress/${userCred._id}`).then((res)=>{
          if (res.data.success) {
            setAddress(res.data.userAddress)
          }
        })
      } catch (error) {
        console.log(error)
      }
  },[])

  const handleEdit =(addressId)=>{
    try {
        let selectdAddress = address.find((addr) => addr._id === addressId)

        if (selectdAddress) {
            setAddressToEdit(selectdAddress);
            setShowEditModal(true);
          }
    } catch (error) {
        
    }
}

  return (
    <>
      <p className='text-center text-2xl font-extrabold m-4'>User Address</p>
      <EditAddressModel showEditModal={showEditModal} setShowEditModal={setShowEditModal} addressToEdit={addressToEdit}/>
      <AddAddressModel showModal={showModal} setShowModal={setShowModal} />
      {
        address ? 
          <>
           {
                address?.map((UserAddress)=>{
                  return (
                    <div key={UserAddress?._id} className="relative m-2 shadow-md">
                      <div className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex justify-between select-none rounded-lg border border-gray-300 p-4" >
                      <div className="ml-5">
                          <p className="mt-2 font-semibold">{UserAddress?.name}</p>
                          <p className="mt-2 font-semibold">{UserAddress?.address}</p>
                          <p className="mt-2 font-semibold">{UserAddress?.mobile}</p>
                          <p className="mt-2 font-semibold">{UserAddress?.city}</p>
                          <p className="mt-2 font-semibold">{UserAddress?.pincode}</p>
                      </div>
                      <div>
                        <button onClick={()=>handleEdit(UserAddress?._id)} className='rounded-lg bg-red-600 p-4'>Edit</button>
                        
                      </div>
                      </div>
                  </div>
                  )
                })
              }
               <div className="relative">
                  <div onClick={()=>setShowModal(true)} className="justify-center peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer rounded-lg border border-gray-300 p-4">
                  <div className="ml-5">
                      <p className="mt-2 font-semibold">Add Address +</p>
                  </div>
                  </div>
              </div>
          </> : <p className='text-center mt-10'> No Data</p>
      }
      
    </>
  )
}

export default ProfileAdress
