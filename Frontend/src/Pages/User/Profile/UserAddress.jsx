import React from 'react'
import Header from '../../../Components/User/Header/Header'
import ProfileSideNav from '../../../Components/User/Profile/ProfileSideNav'
import ProfileAdress from '../../../Components/User/Profile/ProfileAdress'

const UserAddress = () => {
  return (
    <>
      <Header/>
    
    <div className='flex mt-10'>
     <ProfileSideNav/>
      <div className=' border border-gray-300 w-full ms-2'>
        <ProfileAdress/>
      </div>
    </div>
    </>
  )
}

export default UserAddress
