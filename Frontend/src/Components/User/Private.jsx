import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { USER_LOGIN } from '../../RoutePaths/RoutePaths'

const Private = () => {
    const {userCred} = useSelector((state)=> state.user)
  return (
    <>
      {userCred ? <Outlet /> : <Navigate to={USER_LOGIN} replace />}
    </>
  )
}

export default Private
