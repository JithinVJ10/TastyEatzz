import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRiderInfo } from '../../Redux/slice/riderSlice'
import { RiderLogout } from '../../Redux/slice/riderSlice'
import { axiosInstance } from '../../api/axiosInstance'
import { RIDER_DASHBOARD, RIDER_LOGIN } from '../../RoutePaths/RoutePaths'

const RiderProfileSetup2 = () => {
   const [Acc_HolderName, setAccName] = useState()
   const [Acc_Number, setAccNumber] = useState()
   const [IFSC_Code, setIfscCode] = useState()
   const [result, setResult] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {riderCred} = useSelector((state)=> state.rider)

   useEffect(()=>{
    if (riderCred.BankDetails) {
      navigate(RIDER_DASHBOARD)
    }
   })

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

  const handleSubmit =(e)=>{
    e.preventDefault()
    try {
        axiosInstance.post(`/rider/riderBankSetUp-Details/${riderCred._id}`,{Acc_HolderName,Acc_Number,IFSC_Code}).then((res)=>{
            if (res.data.rider) {
              setResult('Sucessfully added')
              dispatch(setRiderInfo(res.data.rider))
                setTimeout(() => {
                    navigate(RIDER_DASHBOARD)
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

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold'>Bank Details Adding</h1>
      <div className='border rounded p-3 mt-20 mb-3 flex justify-center items-center'>

      <form onSubmit={handleSubmit}>

        <div >
          <label className="block text-sm font-semibold text-gray-800" htmlFor="Acc_HolderName"> A/C Holder Name: </label>
          <input type="text" name='Acc_HolderName' value={Acc_HolderName} onChange={(e)=> setAccName(e.target.value)}
          required 
          className="block w-96 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800" htmlFor="Acc_Number"> A/C Number: </label>
          <input type="text" name='Acc_Number' value={Acc_Number} onChange={(e)=> setAccNumber(e.target.value)}
          required 
          className="block w-96 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800" htmlFor="IFSC_Code"> IFSC Code: </label>
          <input type="text" name='IFSC_Code' value={IFSC_Code} onChange={(e)=> setIfscCode(e.target.value)} 
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
    </>
  )
}

export default RiderProfileSetup2
