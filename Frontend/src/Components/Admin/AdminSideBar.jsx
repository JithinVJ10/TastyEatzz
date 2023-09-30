import React from 'react'
import { useDispatch } from 'react-redux'
import { AdminLogout } from '../../Redux/slice/adminSlice' 
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const AdminSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=>{
        try {
          dispatch(AdminLogout())
         
          setTimeout(()=>{
              navigate('/AdminLogin')
          },3000)
          toast.success("Logout", { autoClose: 2000 });
      } catch (error) {
          console.log(error);
      }
      }
  return (
    <div className='flex'>
     
        <nav className=" fixed top-0 left-0 bottom-0 rounded-md w-72 sm:w-30! flex-col justify-between ml-0 pl-4 bg-white">
            <div className=" bg-white h-full">
                <div className="flex py-10 shadow-sm pr-4">

                    <div className="">

                        <h1 className={'sm' ? 'ml-0 pl-0 text-xs text-indigo-600' :'text-2xl font-bold text-indigo-600'}>TastyEatzz</h1>
                            <span className={'sm' ? 'relative top-0 right-0 text-xs text-gray-800' :'text-xs block text-gray-800'}>DASHBOARD</span>
                    </div>
                </div>
                <div className="">
                    <ul className="space-y-8 pt-10">
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                            <Link to='/AdminDashboard'>
                                <a className='hidden sm:block'>Dashboard</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <Link to='/adminUser'>
                                <a className="hidden sm:block">Users</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            <Link to='/adminRider'>
                            <a className='hidden sm:block'>Riders</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <Link to='/adminFood'>
                            <a className='hidden sm:block'>Food items</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            <a className='hidden sm:block'>Banner</a>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <a className='hidden sm:block'>Orders</a>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <a className='hidden sm:block'>Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-white flex items-center space-x-4 pb-10 hover:text-indigo-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <button onClick={()=> handleLogout()}>Logout</button>
            </div>
        </nav>
        {/* content */}
        <div>
            <p>Hello</p>
        </div>
    </div>
  )
}

export default AdminSideBar
