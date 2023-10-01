import React from 'react'
import Header from '../../Components/Rider/RiderHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import RiderProfileSideNav from '../../Components/Rider/RiderProfileSideNav'
import { EDIT_RIDER_PROFILE } from '../../RoutePaths/RoutePaths'

const RiderProfile = () => {
    const {riderCred} = useSelector((state)=> state.rider)
  return (
    <>
      <Header/>
      <h1 className='text-5xl text-center font-serif font-bold'>Rider Profile</h1>
      <div className='flex mt-10'>
       <RiderProfileSideNav/>
        <div className=' border border-gray-300 w-full ms-2'>
         <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
          <div className='flex justify-between items-start'>

              <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Rider Details
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Details and informations about rider.
                  </p>
              </div>
              <div className='mt-3'>
                <Link to={EDIT_RIDER_PROFILE}>
                  <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                    Edit
                  </button>
                </Link>
              </div>
          </div>
              <div class="border-t border-gray-200">
                  <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-bold text-gray-500">
                              Full name
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {riderCred.username}
                          </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-bold text-gray-500">
                              Phone No.
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {riderCred.phone}
                          </dd>
                      </div>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-bold text-gray-500">
                              Email address
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {riderCred.email}
                          </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-bold text-gray-500">
                              Address
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              Nil
                          </dd>
                      </div>
                  </dl>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RiderProfile
