import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import {  HOTEL_CUSINE } from '../../RoutePaths/RoutePaths'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'

const AddCusine = () => {

    const [name,setName] = useState()

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const res = await axiosInstance.post('/hotel/addCuisine',{name})

            if (res.data.cuisine) {
                console.log('success');
                toast.success(res.data.message)
                setTimeout(()=>{
                    navigate(HOTEL_CUSINE)
                },2000)

            }else{
                console.log('errorrr');
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message)
        }

    }
    return (
        <>
        <div className='flex  h-screen'>
        <ToastContainer/>

        <HotelSideNav/>
        
        <div className='flex-grow bg-gray-200 relative top-0 left-20'>
            <div>
            <HotelHeader/>
            </div>
            <div className='pl-8 mt-2'>
                <form onSubmit={handleSubmit}>
                    <div className='p-1'>
                        <label htmlFor='name' className=''>Cusine Name</label>
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
            </div>

            
        </div>
        </div>
    </>
  )
}

export default AddCusine
