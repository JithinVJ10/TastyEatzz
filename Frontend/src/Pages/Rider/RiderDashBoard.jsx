import React from 'react'
import Header from '../../Components/Rider/RiderHeader'
import DataCards from '../../Components/Admin/Cards/DataCards'

const RiderDashBoard = () => {
  return (
    <>
      <Header/>
      
      <div className='flex justify-around mt-10'>
      <DataCards title={'50'} text={"total delivery's complete today"} bgColor={'bg-red-400'}/>
      <DataCards title={'1000₹'} text={"total earnings Today"} bgColor={'bg-yellow-500'}/>
      </div>

      <div className='flex justify-around mt-10'>
      <DataCards title={'5'} text={"total Hour’s worked today"} bgColor={'bg-blue-400'}/>
      <DataCards title={'2000₹'} text={"Wallet"} bgColor={'bg-lime-500'}/>
      </div>
    </>
  )
}

export default RiderDashBoard
