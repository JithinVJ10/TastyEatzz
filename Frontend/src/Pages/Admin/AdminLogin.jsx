import React,{useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'
import { setAdminInfo } from '../../Redux/slice/adminSlice'

const AdminLogin = () => {
    const [adminEmail,setAdminEmail] = useState('')
    const [adminPassword,setAdminPassword] = useState('')
    const [err,setErr] = useState('')
    const [isValid, setIsValid] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {adminCred} = useSelector((state)=> state.admin)

    useEffect(()=>{
        if (adminCred) {
            navigate('/AdminDashboard')
        }
    })

    const handlerEmail = (e)=>{
        setAdminEmail(e.target.value)
        let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regx.test(adminEmail) === false){
          setIsValid(false)
        }else{
            
            setIsValid(true)
        }
    }

    const submitHandler =(e)=>{
        e.preventDefault()
        if (!isValid) {
            setErr('Invalid Email')
            setTimeout(() => {
                setErr('')
            }, 3000);
            return
        }
        axiosInstance.post('/admin/adminLogin',{adminEmail,adminPassword}).then((res)=>{
            if (res.data.email) {
                dispatch(setAdminInfo(res.data.email))
                localStorage.setItem('adminToken',JSON.stringify(res.data.token))
                navigate('/AdminDashboard')
            }
        }).catch((error)=>{
            console.log(error);
            setErr(error?.response?.data?.message || "Invaild Email or Password")
            setTimeout(() => {
                setErr('')
            }, 3000);
            toast.error(error?.response?.data?.message || 'Error')
            console.log(error);
        })
    }
  return (
    <>
      <div className="relative flex flex-col justify-center mt-20 overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-slate-950">
                   Admin Login
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
                            value={adminEmail}
                            name='adminEmail'
                            onChange={handlerEmail}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="adminPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={adminPassword}
                            name='adminPassword'
                            onChange={(e)=> setAdminPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className='text-red-500 text-center'>{err}</p>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-950 rounded-md hover:bg-cyan-500 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>


            </div>
        </div>
    </>
  )
}

export default AdminLogin
