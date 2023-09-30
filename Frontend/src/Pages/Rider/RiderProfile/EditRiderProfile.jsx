import React,{useState} from 'react'
import Header from '../../../Components/Rider/RiderHeader'
import RiderProfileSideNav from '../../../Components/Rider/RiderProfileSideNav'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../api/axiosInstance' 
import { setRiderInfo } from '../../../Redux/slice/riderSlice'

const EditRiderProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {riderCred} = useSelector((state)=> state.rider)

    const [username,setUsername] = useState(riderCred.username)
    const [email,setEmail] = useState(riderCred.email)
    const [phone,setPhone] = useState(riderCred.phone)

    const handleSumbit = async (e)=>{
        e.preventDefault()
        try {
            console.log(riderCred._id);
           const res = await axiosInstance.post(`/rider/UpdateRiderDetials/${riderCred._id}`,{username,email,phone})

           if (res.data.riderData) {
            console.log(res.data.riderData);
            dispatch(setRiderInfo(res.data.riderData))
            navigate('/RiderProfile')
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
      <h1 className='text-5xl text-center font-serif font-bold'>Rider Profile</h1>
      <div className='flex mt-10'>
       <RiderProfileSideNav/>
        <div className=' border border-gray-300 w-full ms-2'>
         <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
          <div className='flex justify-between items-start'>

              <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Edit Rider Details
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Details and informations about rider.
                  </p>
              </div>
          </div>
              <div class="border-t border-gray-200">
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

export default EditRiderProfile
