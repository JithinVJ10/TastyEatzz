import React from 'react'
import Header from '../../../Components/User/Header/Header'
import ProfileSideNav from '../../../Components/User/Profile/ProfileSideNav'
import OrdersList from '../../../Components/User/Orders/OrdersList'

const UserOrder = () => {
  return (
    <>
      <Header/>
    
    <div className='flex px-10 mt-10'>
     <ProfileSideNav/>
      <div className=' border border-gray-300 w-full ms-2'>
        <OrdersList/>
      </div>
    </div>
    </>
  )
}

export default UserOrder
