import React from 'react'
import Header from '../../Components/Rider/RiderHeader'
import DataCard from '../../Components/Rider/Cards/DataCard'
import DashboardProfile from '../../Components/Rider/Cards/DashboardProfile'
import DeliveryCancel from '../../Components/Rider/Cards/DeliveryCancel'
import Footer from '../../Components/User/Footer/Footer'
import CurrentOrder from '../../Components/Rider/Cards/CurrentOrder'


const RiderDashBoard = () => {
  return (
    <>
      <Header/>
      <div className='ms-5 mt-20 px-28'>
        <DashboardProfile/>
      </div>

      <div className='flex justify-center mt-6'>
        <CurrentOrder/>
      </div>

      <div className='flex justify-around mt-16'>
      <DataCard title={'50'} text={"total delivery's complete today"} bgColor={'bg-red-400'}/>
      <DataCard title={'1000₹'} text={"total earnings Today"} bgColor={'bg-yellow-500'}/>
      </div>

      <div className='flex justify-around mt-10'>
      <DataCard title={'5'} text={"total Hour’s worked today"} bgColor={'bg-blue-400'}/>
      <DataCard title={'2000₹'} text={"Wallet"} bgColor={'bg-lime-500'}/>
      </div>
      <div className='mt-14 px-14'>
        <DeliveryCancel/>
      </div>
      
      <div>
        <Footer/>
      </div>
    </>
  )
}

export default RiderDashBoard
