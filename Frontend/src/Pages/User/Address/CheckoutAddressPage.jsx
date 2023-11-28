import React, { useEffect, useState } from 'react'
import Header from '../../../Components/User/Header/Header'
import Footer from '../../../Components/User/Footer/Footer'
import AddAddressModel from '../../../Components/User/Address/AddAddressModel'
import { axiosInstance } from '../../../api/axiosInstance'
import { useSelector } from 'react-redux'
import EditAddressModel from '../../../Components/User/Address/EditAddress'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { CHECKOUT_PAGE } from '../../../RoutePaths/RoutePaths'

const CheckoutAddressPage = () => {
    const [showModal,setShowModal] = useState(false)
    const [showEditModal,setShowEditModal] = useState(false)
    const [address,setAddress] = useState([])
    const [addressToEdit, setAddressToEdit] = useState()
    const { userCred } = useSelector((state)=> state.user)
    const userId = userCred._id

    useEffect(()=>{
        try {
            axiosInstance.get(`/getAddress/${userId}`).then((res)=>{
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
    <div className=''>
      <ToastContainer/>
    <AddAddressModel showModal={showModal} setShowModal={setShowModal} />
    <EditAddressModel showEditModal={showEditModal} setShowEditModal={setShowEditModal} addressToEdit={addressToEdit}/>
    <Header/>
    <div className='px-40'>
    <p className="mt-8 text-lg font-medium">Delivery Address</p>
            <div className="mt-5 grid gap-6">
              {
                address.map((UserAddress)=>{
                  return (
                    <div key={UserAddress._id} className="relative">
                      <div className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex justify-between select-none rounded-lg border border-gray-300 p-4" >
                      <div className="ml-5">
                          <p className="mt-2 font-semibold">{UserAddress.name}</p>
                          <p className="mt-2 font-semibold">{UserAddress.address}</p>
                          <p className="mt-2 font-semibold">{UserAddress.city}</p>
                          <p className="mt-2 font-semibold">{UserAddress.pincode}</p>
                      </div>
                      <div>
                        <button onClick={()=>handleEdit(UserAddress._id)} className='rounded-lg bg-red-600 p-4'>Edit</button>
                        <Link to={`${CHECKOUT_PAGE.replace(':id', UserAddress._id)}`}>
                          <button className='rounded-lg bg-red-600 p-4 ml-2'>Deliver Here</button>
                        </Link>
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
            </div>
    </div>
    <Footer/>
    </div>
  )
}

export default CheckoutAddressPage
