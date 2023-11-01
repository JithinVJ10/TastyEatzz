import React, { useState } from 'react'
import HotelList from '../../Components/Admin/HotelList'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'

const AdminHotel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
        <Header OpenSidebar={OpenSidebar}/>

        <HotelList/>
    </div>
  )
}

export default AdminHotel
