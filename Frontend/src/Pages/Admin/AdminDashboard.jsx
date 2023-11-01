import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AdminLogout } from '../../Redux/slice/adminSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'


const AdminDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
        <Header OpenSidebar={OpenSidebar}/>

        <p className='px-10'>DashBoard</p>
    </div>
  )
}

export default AdminDashboard
