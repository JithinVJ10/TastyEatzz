import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RIDER_LOGIN } from '../../RoutePaths/RoutePaths'

const RiderPrivate = () => {
    const {riderCred} = useSelector((state)=> state.rider)
  return (
    <>
      {riderCred ? <Outlet/> : <Navigate to={RIDER_LOGIN} replace />}
    </>
  )
}

export default RiderPrivate
