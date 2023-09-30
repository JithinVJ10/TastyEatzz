import React from 'react'
import { useDispatch } from 'react-redux'
import { AdminLogout } from '../../Redux/slice/adminSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AdminSideBar from '../../Components/Admin/adminSideBar'
import Header from '../../Components/Admin/header'


const AdminDashboard = () => {
  
    
    
  return (
    <div className='flex  h-screen'>
      

      <AdminSideBar/>
      
      <div className='flex-grow bg-gray-200 relative top-0 left-20'>
        <div>
          <Header/>
        </div>
        <div className='pl-8 mt-2'>
          <h1>Dashboard</h1>
        </div>

        
      </div>
      
    </div>
  )
}

export default AdminDashboard
