import React from 'react'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'
import UserList from '../../Components/Admin/UserList'

const AdminUser = () => {
  return (
    <>
    <div className='flex  h-screen'>
      

      <AdminSideBar/>
      
      <div className='flex-grow bg-gray-200 relative top-0 left-20'>
        <div className=''>
          <Header/>
        </div>
        <div className='pl-8 mt-5 '>
          <UserList/>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default AdminUser
