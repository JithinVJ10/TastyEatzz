import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivate = () => {
    const {adminCred} = useSelector((state)=> state.admin)
  return (
    <>
      {adminCred ? <Outlet /> : <Navigate to='/AdminLogin' replace />}
    </>
  )
}

export default AdminPrivate
