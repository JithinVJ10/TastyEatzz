import React from 'react'
import { Link } from 'react-router-dom'
import * as RoutePaths from '../../RoutePaths/RoutePaths'


const RiderProfileSideNav = () => {
  return (
    <>
     
        <div className=''>
        <ul className=''>
          <li class="w-64  mb-1 flex font-bold bg-teal-50  items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={RoutePaths.RIDER_PROFILE}>
              <a class=''>Profile</a>
            </Link>
          </li>
          <li class=" w-64 mb-1 flex font-bold bg-teal-50 items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={RoutePaths.VEHICLE_PROFILE}>
              <a class=''>Vehicle Details</a>
            </Link>
          </li>
          <li class="w-64 mb-1 flex font-bold bg-teal-50 items-center justify-center hover:text-indigo-600 cursor-pointer border border-gray-300 p-4 rounded">
            <Link to={RoutePaths.BANK_DETAILS_PROFILE}>
              <a class=''>Bank Details</a>
            </Link>
          </li>
         
          
        </ul>



        </div>
        
    </>
  )
}

export default RiderProfileSideNav
