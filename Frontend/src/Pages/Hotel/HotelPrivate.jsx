import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { HOTEL_LOGIN } from '../../RoutePaths/RoutePaths'

const HotelPrivate = () => {
   const {hotelCred} = useSelector((state)=> state.hotel)
  return (
    <>
      {hotelCred ? <Outlet /> : <Navigate to={HOTEL_LOGIN} replace />}
    </>
  )
}

export default HotelPrivate
