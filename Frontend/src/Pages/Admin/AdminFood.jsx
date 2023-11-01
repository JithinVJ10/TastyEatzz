import React, { useState } from 'react'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'
import FoodList from '../../Components/Admin/FoodList'

const AdminFood = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
        <Header OpenSidebar={OpenSidebar}/>

        <FoodList/>
    </div>
  )
}

export default AdminFood
