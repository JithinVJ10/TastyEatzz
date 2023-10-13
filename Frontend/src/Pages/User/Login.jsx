import React, {useState,useEffect} from 'react'
import Header from '../../Components/User/Header/HeaderBeforeLogin'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../Redux/slice/userSlice'
import {toast, ToastContainer} from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';
import { LOGGED_IN_HOME, USER_SIGNUP } from '../../RoutePaths/RoutePaths'


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [err, setError] = useState('')
    const [isValid, setIsValid] = useState(false);
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {userCred} = useSelector((state)=> state.user)
    

    useEffect(()=>{
        if (userCred) {
          navigate(LOGGED_IN_HOME)
        }
    },[])

    
    

    // google
    const responseMessage = (response) => {
        axiosInstance.post('/googleLogin' , response).then((res) => {

            if(res.data.message){
              dispatch(setUserInfo(res.data.userData));
              toast.success(res.data.message);
              setTimeout(() => {
                navigate(LOGGED_IN_HOME);
              }, 3000);
            } else if(res.data.error){
              
              console.log(res.data.error);
              setError(res.data.error)
            }
          }).catch((err) => console.log(err , 'axio catch err g login')
          )
    };
    const errorMessage = (error) => {
        console.log(error);
    };


    const submitHandler = async(e)=>{
        e.preventDefault()
        if (email ==='') {
            setError('Fill Email field')
            setTimeout(()=>{
                setError('')
            },2000)

            return
        }
        if (password ==='') {
            setError('Fill password field')
            setTimeout(()=>{
                setError('')
            },2000)
            return
        }
        if (!isValid) {
            setError('Invalid Email')
            return
        }
        axiosInstance.post('/userLogin',{email,password}).then((res)=>{
            if (res.data.userData) {
                dispatch(setUserInfo(res.data.userData))
                console.log(res.data.userData);
                localStorage.setItem('token',JSON.stringify(res.data.token))
                setTimeout(()=>{
                    navigate(LOGGED_IN_HOME)
                },2000)
                
                toast.success("Login succesfully", { autoClose: 2000 });
                
            }
        }).catch((err)=>{
            console.log(err);
            setError(err?.response?.data?.message || err?.message || "Invaild Email or Password")
            setTimeout(() => {
                setError('')
            }, 3000);
            toast.error(err?.response?.data?.message || 'Error')
        })
    }

    const handlerEmail = (e)=>{
        setEmail(e.target.value)
        let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regx.test(email) === false){
          setIsValid(false)
        }else{
            
            setIsValid(true)
        }
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
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='email'
                            value={email}
                            onChange={handlerEmail}
                            id='email'
                        />
                    </div>
                    <p className='text-red-500 text-center'>{isValid}</p>
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
                            id='password'
                        />
                    </div>
                    <p className='text-red-500 text-center'>{err}</p>
                    <p className="text-xs text-purple-600 hover:underline">
                        Forget Password?
                    </p>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link to={USER_SIGNUP}>
                    <span className="font-medium text-purple-600 hover:underline">
                        Sign up
                    </span>
                    </Link>
                </p>
                <div className='mt-3 flex justify-center'>
                    
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
