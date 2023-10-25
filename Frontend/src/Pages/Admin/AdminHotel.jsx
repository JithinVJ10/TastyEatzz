import React from 'react'
import HotelList from '../../Components/Admin/HotelList'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'

const AdminHotel = () => {
  return (
    <div className='flex  h-screen'>
      

    <AdminSideBar/>
    
    <div className='flex-grow bg-gray-200 relative top-0 left-20'>
      <div>
        <Header/>
      </div>
      <div className='pl-8 mt-2'>
        <HotelList/>
      </div>

      
    </div>
    
  </div>
  )
}

export default AdminHotel
