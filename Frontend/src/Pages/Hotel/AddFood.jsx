import React from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import AddFoodItem from '../../Components/Hotel/AddFoodItem'

const AddFood = () => {
  return (
    <>
    <div className='flex  h-screen'>
      

      <HotelSideNav/>
      
      <div className='flex-grow bg-gray-200 relative top-0 left-20'>
        <div>
          <HotelHeader/>
        </div>
        <div className='pl-8 mt-2'>
          <AddFoodItem/>
        </div>
  
        
      </div>
      
    </div>
      
    </>
  )
}

export default AddFood