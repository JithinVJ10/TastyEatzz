import React from 'react'
import { useDispatch } from 'react-redux'
import { AdminLogout } from '../../Redux/slice/adminSlice' 
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { ADMIN_DASHBOARD, ADMIN_FOOD, ADMIN_HOTEL, ADMIN_LOGIN, ADMIN_RIDER, ADMIN_USER } from '../../RoutePaths/RoutePaths'
import {FaBiking, FaHamburger, FaHotel, FaHubspot, FaTable, FaUser} from 'react-icons/fa'
import { BsCardChecklist } from 'react-icons/bs'
import {IoMdSettings} from 'react-icons/io'

const AdminSideBar = ({openSidebarToggle, OpenSidebar}) => {
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
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
          <div className='sidebar-brand'>
          <h1 className={'text-lg lg:text-2xl font-bold text-indigo-600'}>TastyEatzz</h1>
           <span className={'sm' ? 'relative top-0 right-0 text-xs text-gray-800' :'text-xs block text-gray-800'}>DASHBOARD</span>
          </div>
          <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
          <FaTable className='text-2xl'/>
             <Link to={ADMIN_DASHBOARD}>
                 <a className='hidden sm:block pl-2'>Dashboard</a>
             </Link>
          </li>
          <li className='sidebar-list-item'>
          <FaUser className='text-2xl' />
            <Link to={ADMIN_USER}>
                <a className="hidden sm:block pl-2">Users</a>
            </Link>
          </li>
          <li className='sidebar-list-item'>
          <FaBiking className='text-2xl'/>
            <Link to={ADMIN_RIDER}>
            <a className='hidden sm:block pl-2'>Riders</a>
            </Link>
          </li>
          <li className='sidebar-list-item'>
          <FaHamburger className='text-2xl'/>
            <Link to={ADMIN_FOOD}>
            <a className='hidden sm:block pl-2'>Food items</a>
            </Link>
          </li>
          <li className='sidebar-list-item'>
          <FaHotel className='text-2xl'/>
            <Link to={ADMIN_HOTEL}>
                <a className='hidden sm:block pl-2'>Hotel</a>
            </Link>
          </li>
          <li className='sidebar-list-item'>
          <BsCardChecklist className='text-2xl'/>
            <a className='hidden sm:block pl-2'>Orders</a>
          </li>
        </ul>
      </aside>
  )
}

export default AdminSideBar
