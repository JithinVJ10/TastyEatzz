import React, { useEffect } from 'react'
import Header from '../../Components/User/Header/Header'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/slice/userSlice'
import {toast} from 'react-toastify'
import HeroMain from '../../Components/User/Hero/HeroMain'
import OfferCard from '../../Components/User/Card/OfferCard'
import CategoryRow from '../../Components/User/Card/CategoryRow'
import ProductCard from '../../Components/User/ProductsList/ProductCard'
import Footer from '../../Components/User/Footer/Footer'

const HomeAfterLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='min-h-screen flex flex-col w-full'>
        <Header />
        <HeroMain/>
        <div className='mt-20 px-20'>
          <p className='font-bold text-3xl'>Best offers for you</p>
        </div>
        <div className='flex flex-col md:flex-row bg-slate-300 px-20 w-full mt-10'>
          <OfferCard title={'Get up to 60%'} text={'Off on your next order'} bgColor={'bg-red-400'}/>
          <OfferCard title={'Get 15% off'} text={'Off for Biriyani'} bgColor={'bg-lime-500'}/>
          <OfferCard title={'Get 10% off'} text={'Off on your next order'} bgColor={'bg-cyan-700'}/>
        </div>
        <div className='mt-20 flex px-20'>
          <CategoryRow category={'Pizza'} />
          <CategoryRow category={'Bugger'}/>
          <CategoryRow category={'Biriyani'}/>
          <CategoryRow category={'Meals'}/>
        </div>
        <div className='px-20'>
          <ProductCard title={'Polular Food Items'} />
        </div>
        <div className='px-20'>
          <ProductCard title={'South Indian Food Items'}/>
        </div>
        <div className="">
          <Footer />
        </div>
      
    </div>
  )
}

export default HomeAfterLogin
