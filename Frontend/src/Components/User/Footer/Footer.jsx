import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'

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
        <FaFacebook className='me-2'/>
        <FaInstagram className='me-2'/>
        <FaTwitter/>
      </div>
    </div>
  )
}

export default Footer
