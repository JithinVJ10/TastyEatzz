import React from 'react'
import { Link } from 'react-router-dom'

const ProfileSideNav = () => {
  return (
    <>
     
        <div className=''>
        <ul className=''>
          <li class="w-64  mb-1 flex  items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to='/UserProfile'>
              <a class=''>Profile</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to='/UserOrder'>
              <a class=''>Orders</a>
            </Link>
          </li>
          <li class="w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to='/UserAddress'>
              <a class=''>Address</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to='/UserPayment'>
              <a class=''>Payment</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to='/UserWishlist'>
              <a class=''>Wishlist</a>
            </Link>
          </li>
        </ul>



        </div>
        
    </>
  )
}

export default ProfileSideNav
