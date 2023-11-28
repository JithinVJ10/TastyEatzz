import React, { useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import OrdersList from '../../Components/Hotel/OrdersList'

const HotelOrders = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
      <div className='grid-container'>
      <HotelSideNav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <HotelHeader OpenSidebar={OpenSidebar}/>
      <OrdersList/>
    </div>
    )
}

export default HotelOrders
