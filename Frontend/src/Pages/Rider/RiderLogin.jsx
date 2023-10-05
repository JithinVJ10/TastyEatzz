import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../api/axiosInstance'
import { setRiderInfo } from '../../Redux/slice/riderSlice'
import { RIDER_DASHBOARD, RIDER_PROFILE_SETUP, RIDER_SIGNUP } from '../../RoutePaths/RoutePaths'


const RiderLogin = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [err,setErr] = useState('')
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {riderCred} = useSelector((state)=> state.rider)

    // useEffect(()=>{
    //   if (riderCred) {
    //     navigate(RIDER_DASHBOARD)
    //   }
    // },[navigate,riderCred])

    const submitHandler =  (e)=>{
        e.preventDefault()
        if (!isValid) {
            setErr('Invalid Email')
            toast.error('Invalid Email')
            return
        }
        axiosInstance.post('/rider/riderLogin',{email,password}).then((res)=>{
            if (res.data.rider) {
                dispatch(setRiderInfo(res.data.rider))
                console.log(res.data.rider);
                localStorage.setItem('riderToken',JSON.stringify(res.data.token))
                try {
                    toast.success('Succefully logged In')
                } catch (error) {
                    console.log(error);
                }
                
                navigate(RIDER_PROFILE_SETUP)
                
            }
        }).catch((err)=>{
            console.log(err);
            setErr(err?.response?.data?.message ||"Invaild Email or Password")
            setTimeout(() => {
                setErr('')
            }, 3000);
            toast.error(err?.response?.data?.message || 'Error')
        })
    }

    const handlerEmail = (e)=>{
        setemail(e.target.value)
        let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regx.test(email) === false){
          setIsValid(false)
        }else{
            
            setIsValid(true)
        }
    }

  return (
    <>
      <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
        <ToastContainer/>
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-slate-950">
                   Rider Login
                </h1>
                <form className="mt-6" onSubmit={submitHandler}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            name='email'
                            onChange={handlerEmail}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={password}
                            name='password'
                            onChange={(e)=> setpassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className='text-red-500 text-center'>{err}</p>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-950 rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link to={RIDER_SIGNUP}>
                    <span className="font-medium text-purple-600 hover:underline">
                        Sign up
                    </span>
                    </Link>
                </p>
                    </div>
                </form>


            </div>
        </div>
    </>
  )
}

export default RiderLogin
