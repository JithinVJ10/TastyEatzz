import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { RIDER_DASHBOARD, RIDER_LOGIN } from '../../RoutePaths/RoutePaths'
import { useSelector } from 'react-redux'

const RiderSignup = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [comfirmpassword,setComfirmpassword] = useState('')
    const [err,setErr]= useState('')
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate()

    const {riderCred} = useSelector((state)=>state.rider)

    useEffect(()=>{
        if (riderCred) {
            navigate(RIDER_DASHBOARD)
        }
    },[navigate,riderCred])

    const submitHandler =(e)=>{
        e.preventDefault()

        const spaceRegex = /^\S*$/;
        
        if (!isValid) {
            setErr('Invalid Email')
            return
        }
        if (password !== comfirmpassword) {
            setErr('Password not matching')
            return
        }

        if (!spaceRegex.test(username) ) {
            setErr('Please fill')
            setTimeout(()=>{
                setErr('')
            },2000)

            return
        }
        if (!spaceRegex.test(phone) ) {
            setErr('Please fill')
            setTimeout(()=>{
                setErr('')
            },2000)

            return
        }

        if (!spaceRegex.test(password) ) {
            setErr('Please fill')
            setTimeout(()=>{
                setErr('')
            },2000)

            return
        }

        if (!spaceRegex.test(comfirmpassword) ) {
            setErr('Please fill')
            setTimeout(()=>{
                setErr('')
            },2000)

            return
        }

        try {
            axiosInstance.post('/rider/riderRegister',{email,username,phone,password}).then((res)=>{
                if (res.data.message) {
                    setTimeout(() => {
                        
                        navigate(RIDER_LOGIN)
                    }, 2000);
                    toast.success('Succefully created')
                }
            })
        } catch (error) {
            console.log(error);
            toast.error('Signup Error')
            setErr('Error')
        }
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
      <div className="relative flex flex-col justify-center mt-10 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   Rider SignUp
                </h1>
                <form className="mt-6" onSubmit={submitHandler}>
                <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='username'
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
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
                    <Link to="/RiderLogin">
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

export default RiderSignup
