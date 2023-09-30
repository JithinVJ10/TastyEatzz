import React,{useState} from 'react'
import Header from '../../Components/User/Header/HeaderBeforeLogin'
import { axiosInstance } from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'

const SignUp = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [comfirmpassword,setComfirmpassword] = useState('')
    const [err,setErr] = useState('')
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!isValid) {
            setErr('Invalid Email')
            return
        }
      
        if (password !== comfirmpassword) {
          setErr('Password not matching');
          return;
        }
      
        try {
          const response = await axiosInstance.post('/userRegister', {
            username,
            email,
            phone,
            password,
          });
      
          if (response.data.message) {
            setTimeout(() => {
              navigate('/userLogin');
            }, 2000);
            setErr('Success')
          }
        } catch (error) {
          console.log(error, 'Helloooooooo');
          setErr(error?.response?.data?.message || 'Error');
          toast.error('Signup Error');
        }
    };

    const handlerEmail = (e)=>{
        setEmail(e.target.value)
        let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regx.test(email) === false){
          setIsValid(false)
        }else{
            
            setIsValid(true)
        }
    }


      

     // google
    const responseMessage = (response) => {
        axiosInstance.post('/googleSignUp' , response).then((res) => {
            if(res.data){
              toast.success(res.data.message, {duration : 2000 , style : {color : '#fff' , background : 'black'}});

              setTimeout(() => {
                navigate('/userLogin');
              }, 3000);
            }
          }).catch((err) => console.log(err, 'axios catch err google signup')
          )
    };
    const errorMessage = (error) => {
        console.log(error);
    };

  return (
    <>
    <Header status={'Login'}/>
       <div className="relative flex flex-col justify-center mt-10 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   Sign Up
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
                            required
                            maxLength={10}
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
                    <p className={err === 'Success' ? 'text-green-600 text-center': 'text-red-500 text-center'}>{err}</p>

                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Sign up
                        </button>
                    </div>
                    <div className='mt-3 flex justify-center'>
                    
                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                    </div>
                </form>

            </div>
        </div>
    </>
  )
}

export default SignUp
