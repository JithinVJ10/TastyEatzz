import React, { useState } from 'react'
import { axiosInstance } from '../../api/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { HOTEL_LOGIN } from '../../RoutePaths/RoutePaths'
import { Link, useNavigate } from 'react-router-dom'


const HotelSignUp = () => {
  const [hotelName,setHotelName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [comfirmpassword,setComfirmpassword] = useState('')
  const [err,setErr]= useState('')
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate()

  const handlerEmail = (e)=>{
    setEmail(e.target.value)
    let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(regx.test(email) === false){
      setIsValid(false)
    }else{
        
        setIsValid(true)
    }
 }

  const submitHandler = async (e)=>{
    e.preventDefault()
    if (!isValid) {
        setErr('Invalid Email')
        toast.error("invalid Email", { autoClose: 2000 });
        return
    }
    if (password !== comfirmpassword) {
        setErr('Password not matching')
        toast.error("Password not matching", { autoClose: 2000 });
        return
    }
    try {
      const res = await  axiosInstance.post('/hotel/HotelRegister',{email,hotelName,phone,password})
            if (res.data.message) {
                setTimeout(() => {
                    
                  navigate(HOTEL_LOGIN)
                }, 2000);
                toast.success('Succefully created')
            }
    } catch (error) {
        console.log(error);
        setErr(error?.response?.data?.message ||'Signup Error')
        toast.error(error?.response?.data?.message ||'Signup Error')   
    }
  }




  return (
    <>
      <div className="relative flex flex-col justify-center mt-10 overflow-hidden">
        <ToastContainer/>
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   HOTEL SIGNUP
                </h1>
                <form className="mt-6" onSubmit={submitHandler}>
                <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Hotel Name
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='username'
                            value={hotelName}
                            onChange={(e)=> setHotelName(e.target.value)}
                            required
                        />
                    </div>
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
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='phone'
                            value={phone}
                            onChange={(e)=> setPhone(e.target.value)}
                            maxLength={10}
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
                            name='password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required

                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="comfirmpassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Comfirm Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='comfirmpassword'
                            value={comfirmpassword}
                            onChange={(e)=> setComfirmpassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className='text-red-500 text-center'>{err}</p>

                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Sign up
                        </button>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have account?{" "}
                    <Link to={HOTEL_LOGIN}>
                    <span className="font-medium text-purple-600 hover:underline">
                        login
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

export default HotelSignUp