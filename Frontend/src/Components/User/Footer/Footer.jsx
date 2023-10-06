import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-56 flex justify-between items-center  bg-cyan-400 p-10 mt-10'>
        
      <p className='ps-10 text-2xl font-bold'>
       TastyEatzz
      </p>
      <div className='flex'>
        <p className='pe-4 font-bold'>About us</p>
        <p className='pe-4 font-bold'>Delivery</p>
        <p className='pe-4 font-bold'>Help & Support</p>
        <p className='pe-4 font-bold'>T&C</p>
      </div>
      <div className='flex pe-10'>
        <p className='pe-1 font-bold'>F</p>
        <p className='pe-1 font-bold'>I</p>
        <p className='pe-1 font-bold'>W</p>
      </div>
    </div>
  )
}

export default Footer
