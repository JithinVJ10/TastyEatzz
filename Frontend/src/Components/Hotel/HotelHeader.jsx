import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {  PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

import { Link ,useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { ADMIN_DASHBOARD, HOTEL_DASHBOARD, HOTEL_LOGIN } from '../../RoutePaths/RoutePaths'
import { hotelLogout } from '../../Redux/slice/hotelSlice' 
import DropdownButton from './DropDown'


const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HotelHeader(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const {hotelCred} = useSelector((state)=> state.hotel)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout =()=>{
    try {
        dispatch(hotelLogout())
        setTimeout(() => {
            navigate(HOTEL_LOGIN)
        }, 3000);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <header className="bg-white ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to={HOTEL_DASHBOARD}>
          <div className="-m-1.5 p-1.5 flex">
          <h1 className='text-5xl font-extrabold'>HOTEL</h1>
          </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="sm:block hidden " >
        <div><p className='text-center'>Hotel</p></div>
        <DropdownButton/>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
          <Link to={ADMIN_DASHBOARD}>
            <p  className="-m-1.5 p-1.5">
              <span className="sr-only">TastyEatzz</span>
            </p>
          </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 sm:hidden">

            {hotelCred? <p onClick={()=>handleLogout()}>Logout</p> : <Link to={HOTEL_LOGIN}><p>Login</p></Link> }

            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
