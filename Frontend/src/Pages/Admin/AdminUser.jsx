import React, { useState } from 'react'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'
import UserList from '../../Components/Admin/UserList'

const AdminUser = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
        <Header OpenSidebar={OpenSidebar}/>

        <UserList/>
    </div>
  )
}

export default AdminUser
