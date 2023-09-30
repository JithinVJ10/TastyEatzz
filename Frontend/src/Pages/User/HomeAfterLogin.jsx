import React, { useEffect } from 'react'
import Header from '../../Components/User/Header/Header'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/slice/userSlice'
import {toast} from 'react-toastify'

const HomeAfterLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <>
        <Header />
      <h1 className='text-4xl text-center mt-10'>
        HomePage after login
        
      </h1>
      
    </>
  )
}

export default HomeAfterLogin
