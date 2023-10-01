import React,{useEffect,useState} from 'react'
import {toast} from 'react-toastify'
import { RiderLogout } from '../../Redux/slice/riderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRiderInfo } from '../../Redux/slice/riderSlice'
import { axiosInstance } from '../../api/axiosInstance'
import { RIDER_DASHBOARD, RIDER_LOGIN, RIDER_PROFILE_SETUP2 } from '../../RoutePaths/RoutePaths'

const RiderProfileSetup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {riderCred} = useSelector((state)=> state.rider)

  const [VehicleModel, setVehicleModel] = useState()
  const [VehicleNo, setVehicleNo] = useState()
  const [RcNumber, setRcNumber] = useState()
  const [LicenseId, setLicenseId] = useState()
  const [result, setResult] = useState('')


  const handleSubmit =(e)=>{
    e.preventDefault()
    try {
        axiosInstance.post(`/rider/riderVehicleDetails/${riderCred._id}`,{VehicleModel,VehicleNo,RcNumber,LicenseId}).then((res)=>{
            if (res.data.rider) {
              setResult('Sucessfully added')
              dispatch(setRiderInfo(res.data.rider))
                setTimeout(() => {
                    navigate(RIDER_PROFILE_SETUP2)
                }, 2000);
                
            }else{
              console.log('Update failed');
              setResult('Update failed')
            }
        })
    } catch (error) {
        console.log(error);
        setResult('Error')
    }
}


    
    const handleLogout = ()=>{
      try {
        dispatch(RiderLogout())
       
        setTimeout(()=>{
            navigate(RIDER_LOGIN)
        },3000)
        toast.success("Logout", { autoClose: 2000 });
    } catch (error) {
        console.log(error);
    }
    }

    const handleNavigate = ()=>{
      try {
        navigate(RIDER_DASHBOARD)
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold'>Rider Profile Setup</h1>
      <div className='border rounded p-3 mt-20 mb-3 flex justify-center items-center'>

      <form onSubmit={handleSubmit}>

        <div >
          <label className="block text-sm font-semibold text-gray-800" htmlFor="VehicleModel"> Vehicle Model: </label>
          <input type="text" name='VehicleModel' value={VehicleModel} onChange={(e)=> setVehicleModel(e.target.value)}
          required 
          className="block w-96 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800" htmlFor="VehicleNo"> VehicleNo: </label>
          <input type="text" name='VehicleNo' value={VehicleNo} onChange={(e)=> setVehicleNo(e.target.value)}
          required 
          className="block w-96 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800" htmlFor="RcNumber"> RC Number: </label>
          <input type="text" name='RcNumber' value={RcNumber} onChange={(e)=> setRcNumber(e.target.value)} 
          required
          className="block w-96 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800" htmlFor="LicenseId"> LicenseId : </label>
          <input type="text" name='LicenseId' value={LicenseId} onChange={(e)=> setLicenseId(e.target.value)} 
          required
          className="block w-96 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <p className='text-red-500 text-center'>{result}</p>
        <div className='mt-5 flex justify-center'>
        <button type='submit' className='bg-blue-500 border rounded p-2'> Save </button>
        </div>
      </form>
      </div>
      <button onClick={()=> handleLogout()} type='button' className='bg-blue-500 border rounded p-2'> Logout</button>
      <button onClick={()=> handleNavigate()} type='button' className='bg-blue-500 border rounded p-2'> Skip</button>
    </>
  )
}

export default RiderProfileSetup
