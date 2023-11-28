import React from 'react'
import { BsCardChecklist } from 'react-icons/bs'
import { FaHamburger, FaTable, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HOTEL_DASHBOARD, HOTEL_FOOD, HOTEL_ORDER } from '../../RoutePaths/RoutePaths'
import { IoMdSettings } from 'react-icons/io'

const HotelSideNav = ({openSidebarToggle, OpenSidebar}) => {

  return (
    <>
         <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
          <div className='sidebar-brand'>
          <h1 className={'text-lg lg:text-2xl font-bold text-indigo-600'}>TastyEatzz</h1>
           <span className={'sm' ? 'relative top-0 right-0 text-xs text-gray-800' :'text-xs block text-gray-800'}>HOTEL</span>
          </div>
          <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
          <FaTable className='text-2xl'/>
             <Link to={HOTEL_DASHBOARD}>
                 <a className='hidden sm:block pl-2'>Dashboard</a>
             </Link>
          </li>
          <li className='sidebar-list-item'>
          <FaHamburger className='text-2xl' />
             <Link to={HOTEL_FOOD}>
                 <a className="hidden sm:block pl-2">Food Item</a>
             </Link>
          </li>
          <li className='sidebar-list-item'>
          <FaUser className='text-2xl'/>
             <Link to={''}>
             <a className='hidden sm:block pl-2'>Profile</a>
             </Link>
          </li>
          <li className='sidebar-list-item'>
            <BsCardChecklist className='text-2xl'/>
            <Link to={HOTEL_ORDER}>
              <a className='hidden sm:block pl-2'>Orders</a>
            </Link>
          </li>
          <li className='sidebar-list-item'>
          <IoMdSettings className='text-2xl'/>
             <a className='hidden sm:block pl-2'>Settings</a>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default HotelSideNav
