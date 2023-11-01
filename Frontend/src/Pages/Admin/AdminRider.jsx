import React, { useState } from 'react'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'
import RidersList from '../../Components/Admin/RidersList'

const AdminRider = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
        <Header OpenSidebar={OpenSidebar}/>

        <RidersList/>
    </div>
  )
}

export default AdminRider
