import React from 'react'
import Header from '../../../Components/User/Header/Header'
import { Link } from 'react-router-dom'
import { LOGGED_IN_HOME } from '../../../RoutePaths/RoutePaths'
import Footer from '../../../Components/User/Footer/Footer'

const OrderPlaced = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-col items-center justify-center py-44 '>
        <p className='text-center text-lg font-bold'>
          Order Placed Successfully
        </p>
        <Link to={LOGGED_IN_HOME}>
          <button className='mt-4 bg-lime-500 p-4 text-lg font-bold'>
            Continue
          </button>
        </Link>
      </div>
      <Footer/>
    </>
  )
}

export default OrderPlaced
