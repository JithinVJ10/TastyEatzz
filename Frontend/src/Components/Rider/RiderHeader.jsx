import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {  PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

import { Link, useNavigate } from 'react-router-dom'
import DropdownButton from './RiderDropDown'
import { useDispatch, useSelector } from 'react-redux'
import { RiderLogout } from '../../Redux/slice/riderSlice'
import { RIDER_DASHBOARD, RIDER_LOGIN } from '../../RoutePaths/RoutePaths'

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {riderCred} = useSelector((state)=> state.rider)

  const handleLogout =()=>{
    try {
        dispatch(RiderLogout())
        
        setTimeout(()=>{
            navigate(RIDER_LOGIN)
        },3000)
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to={RIDER_DASHBOARD}>
          <div className="-m-1.5 p-1.5 ">
            
            <p className="font-bold text-3xl">TastyEatzz</p>
            <p className='font-thin ml-2'>Rider</p>
          </div>
          </Link>
        </div>
        <div className='flex'>
          <p className='me-4 font-bold'>My Delivery</p>
          <p className='me-4 font-bold'>Wallet</p>
          <p className='me-4 font-bold'>Profile</p>
          
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

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
         <DropdownButton/>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
          <Link to='/'>
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
            <div className="-my-6 divide-y divide-gray-500/10">

              <div className="py-6">
              {riderCred? <p onClick={()=>handleLogout()}>Logout</p> : <Link to={RIDER_LOGIN}><p>Login</p></Link> }
              </div>

            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
