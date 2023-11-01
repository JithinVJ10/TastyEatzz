import React, {useState,useEffect} from 'react'
import Header from '../../../Components/User/Header/HeaderBeforeLogin'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../../Redux/slice/userSlice'
import {toast, ToastContainer} from 'react-toastify'
import { LOGGED_IN_HOME } from '../../../RoutePaths/RoutePaths'


const UserEnterOTP = () => {
    const [phoneNum,setphoneNum] = useState('')
    const [verificationCode, setVerificationCode] = useState()
    
    const [err, setError] = useState('')
    const [isValid, setIsValid] = useState(false);
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userCred} = useSelector((state)=> state.user)
    
    const phoneInfo = JSON.parse(localStorage.getItem('phone')) ? JSON.parse(localStorage.getItem('phone')) : ''
    const [phone,setPhone] = useState(phoneInfo) 

    useEffect(()=>{
        if (userCred) {
          navigate(LOGGED_IN_HOME)
        }
    },[])



    const submitHandler = async(e)=>{
        e.preventDefault()

        axiosInstance.post('/OTPverify',{verificationCode,phone}).then((res)=>{
            if (res.data.userData) {
                dispatch(setUserInfo(res.data.userData))
                console.log(res.data.userData);
                localStorage.setItem('token',JSON.stringify(res.data.token))
                localStorage.removeItem('phone')
                setTimeout(()=>{
                    navigate(LOGGED_IN_HOME)
                },2000)
                
                toast.success("Login succesfully", { autoClose: 2000 });
                
            }
        }).catch((err)=>{
            console.log(err);
            setError(err?.response?.data?.message || err?.message || "Wrong OTP")
            setTimeout(() => {
                setError('')
            }, 3000);
            toast.error(err?.response?.data?.message || err?.message || "Wrong OTP")
        })
    }


    

  return (
    <>
    <Header status={'Signup'}/>
    <ToastContainer/>
    
       <div className="relative flex flex-col justify-center mt-10 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   Login
                </h1>
                
                <form className="mt-6" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone Number
                        </label>
                        <input
                            type="phone"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='phone'
                            value={phone}
                            id='phone'
                            readOnly
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="OTP"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Enter OTP
                        </label>
                        <input
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='verificationCode'
                            value={verificationCode}
                            onChange={(e)=>setVerificationCode(e.target.value)}
                            id='verificationCode'
                            required
                        />
                    </div>
                    <p className='text-red-500 text-center'>{isValid}</p>
                    <p className='text-red-500 text-center'>{err}</p>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Sumbit OTP
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </>
  )
}

export default UserEnterOTP
