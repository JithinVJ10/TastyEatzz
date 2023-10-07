import React from 'react'
import {FaAddressCard} from 'react-icons/fa'

const DeliveryCancel = () => {
  return (
    <div className='flex justify-between ms-10'>
        <div className='flex justify-center items-center ml-20'>
            <FaAddressCard className='text-4xl '/>
            <div className='p-5'>
                <p className='font-bold text-red-600'>5 deliveries cancelled today</p>
                <p className='font-bold'>only 10 allowed</p>
            </div>
        </div>
      
    </div>
  )
}

export default DeliveryCancel
