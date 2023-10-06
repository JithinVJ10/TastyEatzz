import React from 'react'
import {FaBell} from 'react-icons/fa'

const DashboardProfile = () => {
  return (
    <div className='flex justify-between ms-10'>
        <div className='flex'>
            <img src="https://wallpapers.com/images/hd/cool-profile-picture-1ecoo30f26bkr14o.jpg" alt="" className='rounded-full h-20 w-20'/>
            <div className='p-5'>
                <p className='font-bold'>Delivery Boy</p>
                <p className='font-bold'>deliveryboy@gmail.com</p>
            </div>
        </div>
        <div className='me-10 pt-3 pe-8'>
            <FaBell className='text-3xl'/>
        </div>
      
    </div>
  )
}

export default DashboardProfile
