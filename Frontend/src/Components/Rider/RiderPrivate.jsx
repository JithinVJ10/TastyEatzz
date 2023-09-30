import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RiderPrivate = () => {
    const {riderCred} = useSelector((state)=> state.rider)
  return (
    <>
      {riderCred ? <Outlet/> : <Navigate to='/RiderLogin' replace />}
    </>
  )
}

export default RiderPrivate
