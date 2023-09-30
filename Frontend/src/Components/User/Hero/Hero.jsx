import React from 'react'
import SearchComponent from '../../SearchBar'

const Hero = () => {
  return (
    <>
    <div className='flex mt-20'>

     <div>

      <div className='me-8'>
        <h1 className='font-bold text-7xl'>Premium <span className='text-orange-500'>quality</span></h1>
        <h1 className='font-bold text-7xl leading-loose'>Food for your <span className='text-orange-500'>healthy</span></h1>
        <h1 className='font-bold text-7xl'><span className='text-orange-500'>& Daily Life</span></h1>
      </div>
      <div className='mt-10 flex'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2 me-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
        <SearchComponent title={'Locate'} placeholder={'Enter your location'}/>
      </div>
      <div className='mt-7'>
        <p className='font-bold'>Available cities in Kerala</p>
        <p className='mt-4'>
        <span className='tracking-wide pr-5'>Thiruvananthapuram</span> 
        <span className='tracking-wide pr-5 text-orange-500'>Kochi</span> 
        <span className='tracking-wide pr-5'>Kozhikode</span> 
        <span className='tracking-wide pr-5 text-orange-500'>Thrissur</span> 
        <span className='tracking-wide pr-5'>Alappuzha</span> 
        <span className='tracking-wide pr-5 text-orange-500'>Kottayam</span> 
        <span className='tracking-wide pr-5'>Kannur</span> </p>
      </div>

     </div>
     <div>
        <img className='rounded-2xl' src="https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg?w=2000" alt="" width={350} />
     </div>
    </div>

      
    </>
  )
}

export default Hero
