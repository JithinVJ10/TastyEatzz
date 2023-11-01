import React, { useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import AddFoodItem from '../../Components/Hotel/AddFoodItem'

const AddFood = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
    <HotelSideNav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <HotelHeader OpenSidebar={OpenSidebar}/>
    <AddFoodItem/>
  </div>
  )
}

export default AddFood
