import React from 'react'
import Header from '../../Components/User/Header/Header'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileSideNav from '../../Components/User/Profile/ProfileSideNav'

const UserProfile = () => {
    const {userCred} = useSelector((state)=> state.user)
  return (
    <>
    <Header/>
      
      <div className='flex mt-10'>
       <ProfileSideNav/>
        <div className=' border border-gray-300 w-full ms-2'>
         <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
          <div className='flex justify-between items-start'>

              <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                      User Details
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Details and informations about user.
                  </p>
              </div>
              <div className='mt-3'>
                <Link to='/EditProfile'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                    Edit
                  </button>
                </Link>
              </div>
          </div>
              <div class="border-t border-gray-200">
                  <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                              Full name
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {userCred.username}
                          </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                              Phone No.
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {userCred.phone}
                          </dd>
                      </div>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                              Email address
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {userCred.email}
                          </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
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

export default UserProfile
