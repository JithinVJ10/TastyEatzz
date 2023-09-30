import React from 'react'
import Header from '../../../Components/User/Header/Header'
import ProfileSideNav from '../../../Components/User/Profile/ProfileSideNav'

const UserOrder = () => {
  return (
    <>
      <Header/>
    
    <div className='flex mt-10'>
     <ProfileSideNav/>
      <div className=' border border-gray-300 w-full ms-2'>
        <p className='text-center mt-10'> No Order Data</p>
      </div>
    </div>
    </>
  )
}

export default UserOrder
