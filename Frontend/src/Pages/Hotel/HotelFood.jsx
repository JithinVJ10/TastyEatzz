import React, { useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import FoodList from '../../Components/Hotel/FootList'

const HotelFood = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
    <HotelSideNav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <HotelHeader OpenSidebar={OpenSidebar}/>
    <FoodList/>
  </div>
  )
}

export default HotelFood
