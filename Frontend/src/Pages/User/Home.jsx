import React, { useEffect } from 'react'
import Hero from '../../Components/User/Hero/Hero'
import ProductCard from '../../Components/User/ProductsList/ProductCard'
import HeaderBeforeLogin from '../../Components/User/Header/HeaderBeforeLogin'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {userCred} = useSelector((state)=> state.user)

  const navigate = useNavigate()

  useEffect(()=>{
    if (userCred) {
      navigate('/LoggedInHome')
    }
  },[])

  return (
    <>
    <HeaderBeforeLogin status={'Login'}/>
      <Hero/>
      <ProductCard/>
    </>
  )
}

export default Home
