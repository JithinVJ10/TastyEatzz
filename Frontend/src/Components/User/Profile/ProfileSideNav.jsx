import React from 'react'
import { Link } from 'react-router-dom'
import { USER_ADDRESS, USER_ORDER, USER_PAYMENT, USER_PROFILE, USER_WISHLIST } from '../../../RoutePaths/RoutePaths'

const ProfileSideNav = () => {
  return (
    <>
     
        <div className=''>
        <ul className=''>
          <li class="w-64  mb-1 flex  items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={USER_PROFILE}>
              <a class=''>Profile</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={USER_ORDER}>
              <a class=''>Orders</a>
            </Link>
          </li>
          <li class="w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={USER_ADDRESS}>
              <a class=''>Address</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={USER_PAYMENT}>
              <a class=''>Payment</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={USER_WISHLIST}>
              <a class=''>Wishlist</a>
            </Link>
          </li>
        </ul>



        </div>
        
    </>
  )
}

export default ProfileSideNav
