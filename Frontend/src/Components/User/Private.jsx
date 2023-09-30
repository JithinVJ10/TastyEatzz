import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    const {userCred} = useSelector((state)=> state.user)
  return (
    <>
      {userCred ? <Outlet /> : <Navigate to='/userLogin' replace />}
    </>
  )
}

export default Private
