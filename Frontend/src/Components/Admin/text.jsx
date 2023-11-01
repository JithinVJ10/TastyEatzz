import React from 'react'
import { useDispatch } from 'react-redux'
import { AdminLogout } from '../../Redux/slice/adminSlice' 
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { ADMIN_DASHBOARD, ADMIN_FOOD, ADMIN_HOTEL, ADMIN_LOGIN, ADMIN_RIDER, ADMIN_USER } from '../../RoutePaths/RoutePaths'
import {FaBiking, FaHamburger, FaHotel, FaHubspot, FaTable, FaUser} from 'react-icons/fa'
import { BsCardChecklist } from 'react-icons/bs'
import {IoMdSettings} from 'react-icons/io'

const AdminSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=>{
        try {
          dispatch(AdminLogout())
         
          setTimeout(()=>{
              navigate(ADMIN_LOGIN)
          },3000)
          toast.success("Logout", { autoClose: 2000 });
      } catch (error) {
          console.log(error);
      }
      }
  return (
    <div className='flex  w-36 md:w-60'>
     
        <nav className=" fixed w-36 md:w-60 rounded-md flex-col justify-between ml-0 pl-4 bg-cyan-50 h-screen">
            <div className=" bg-cyan-50 h-full">
                <div className="flex py-10 shadow-sm pr-4">

                    <div className="">

                        <h1 className={'text-lg lg:text-2xl font-bold text-indigo-600'}>TastyEatzz</h1>
                            <span className={'sm' ? 'relative top-0 right-0 text-xs text-gray-800' :'text-xs block text-gray-800'}>DASHBOARD</span>
                    </div>
                </div>
                <div className="">
                    <ul className="space-y-8 pt-10">
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <FaTable className='text-2xl'/>
                            <Link to={ADMIN_DASHBOARD}>
                                <a className='hidden sm:block'>Dashboard</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <FaUser className='text-2xl' />
                            <Link to={ADMIN_USER}>
                                <a className="hidden sm:block">Users</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <FaBiking className='text-2xl'/>
                            <Link to={ADMIN_RIDER}>
                            <a className='hidden sm:block'>Riders</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <FaHamburger className='text-2xl'/>
                            <Link to={ADMIN_FOOD}>
                            <a className='hidden sm:block'>Food items</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <FaHotel className='text-2xl'/>
                            <Link to={ADMIN_HOTEL}>
                                <a className='hidden sm:block'>Hotel</a>
                            </Link>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <BsCardChecklist className='text-2xl'/>
                            <a className='hidden sm:block'>Orders</a>
                        </li>
                        <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                            <IoMdSettings className='text-2xl'/>
                            <a className='hidden sm:block'>Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default AdminSideBar
