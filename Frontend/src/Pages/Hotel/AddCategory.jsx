import React,{useState} from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import { axiosInstance } from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { HOTEL_CATEGORY } from '../../RoutePaths/RoutePaths'


const AddCategory = () => {
    const [name,setName] = useState()
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const res = await axiosInstance.post('/hotel/addCategory',{name})

            if (res.data.category) {
                console.log('success');
                toast.success(res.data.message)
                setTimeout(()=>{
                    navigate(HOTEL_CATEGORY)
                },2000)

            }
        } catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
        }

    }
  return (
    <>
    <div className='grid-container'>
    <ToastContainer/>
    <HotelSideNav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <HotelHeader OpenSidebar={OpenSidebar}/>
    <main className='main-container'>
            <form onSubmit={handleSubmit}>
                <div className='p-1'>
                    <label htmlFor='name' className=''>Category Name</label>
                    <input 
                    type="text"
                    className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    value={name}
                    name='name'
                    id='name'
                    onChange={(e)=>setName(e.target.value)}
                    required
                    />
                </div>
                <div className='mt-3'>
                <button className='bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-md hover:bg-blue-600 focus:outline-none text-base font-semibold' type="submit">
                    ADD
                </button>
                </div>
            </form>
        </main>
    </div>
    </>
  )
}

export default AddCategory
