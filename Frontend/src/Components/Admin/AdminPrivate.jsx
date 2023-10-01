import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { ADMIN_LOGIN } from '../../RoutePaths/RoutePaths'

const AdminPrivate = () => {
    const {adminCred} = useSelector((state)=> state.admin)
  return (
    <>
      {adminCred ? <Outlet /> : <Navigate to={ADMIN_LOGIN} replace />}
    </>
  )
}

export default AdminPrivate
