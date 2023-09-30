import React,{useState} from 'react'
import Header from '../../../Components/User/Header/Header'
import ProfileSideNav from '../../../Components/User/Profile/ProfileSideNav'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance'
import { setUserInfo } from '../../../Redux/slice/userSlice'

const EditProfile = () => {
    
    const {userCred} = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username,setUsername] = useState(userCred.username)
    const [email,setEmail] = useState(userCred.email)
    const [phone,setPhone] = useState(userCred.phone)

    const handleSumbit = async (e)=>{
        e.preventDefault()
        try {
            console.log(userCred._id);
           const res = await axiosInstance.post(`/UpdateUserDetials/${userCred._id}`,{username,email,phone})

           if (res.data.userData) {
            dispatch(setUserInfo(res.data.userData))
            navigate('/UserProfile')
           }else{
            console.log('Update Failed');
           }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <Header/>
    
    <div className='flex mt-10'>
     <ProfileSideNav/>
      <div className=' border border-gray-300 w-full ms-2'>
       <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div className='flex justify-between items-start'>

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit User Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about user.
                </p>
            </div>

        </div>
            <div className="border-t border-gray-200">
                <form onSubmit={handleSumbit}>

                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input type="text" value={username} name="username" onChange={(e)=>setUsername(e.target.value)}  
                            className='border rounded p-2'/>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Phone No.
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input type="text" value={phone} name="phone" id="" 
                            onChange={(e)=>setPhone(e.target.value)}
                            className='border rounded p-2'/>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input type="text" value={email} name="email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        className='border rounded p-2'/>
                        </dd>
                    </div>
                    <div className='mt-3 ml-6 mb-5'>
                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                        Update
                    </button>
                </div>
                </dl>
                </form>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EditProfile
