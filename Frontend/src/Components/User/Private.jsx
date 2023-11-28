import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { USER_LOGIN } from '../../RoutePaths/RoutePaths'
import { axiosInstance } from '../../api/axiosInstance'

const Private = () => {
    const {userCred} = useSelector((state)=> state.user)
    const [user,SetUser]=useState()

    // useEffect(()=>{
    //   axiosInstance.get(`/getLoggedInUser/${userCred._id}`).then((res)=>{
    //     if (res.data.userData) {
    //       SetUser(res.data.userData)
    //     }
    //   })
    // },[user])
  return (
    <>
      {userCred  ? <Outlet /> : <Navigate to={USER_LOGIN} replace />}
    </>
  )
}

export default Private
