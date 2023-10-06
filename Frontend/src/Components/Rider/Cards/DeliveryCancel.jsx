import React from 'react'
import {FaAddressCard} from 'react-icons/fa'

const DeliveryCancel = () => {
  return (
    <div className='flex justify-between ms-10'>
        <div className='flex justify-center items-center ml-20'>
            <FaAddressCard className='text-4xl '/>
            <div className='p-5'>
                <p className='font-bold'>Delivery Boy</p>
                <p className='font-bold'>deliveryboy@gmail.com</p>
            </div>
        </div>
      
    </div>
  )
}

export default DeliveryCancel
