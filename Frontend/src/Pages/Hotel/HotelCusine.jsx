import React, { useEffect, useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import { Link } from 'react-router-dom'
import { HOTEL_ADD_CUSINE } from '../../RoutePaths/RoutePaths'
import { axiosInstance } from '../../api/axiosInstance'
import EditCategory from '../../Components/Hotel/EditCategory'
import {toast,ToastContainer} from 'react-toastify'
import swal from 'sweetalert'

const HotelCusine = () => {
    const [cuisine, setCuisine] = useState()
    const [cuisineToEdit,setCuisineToEdit] = useState()
    const [showModal,setShowModal] = useState(false)

    useEffect(()=>{
      try {
        axiosInstance.get('/hotel/getCuisine').then((res)=>{
          if (res.data.cuisine) {
            setCuisine(res.data.cuisine)
          }else{
            console.log('Cuisine not found');
          }
        })
      } catch (error) {
        console.log(error);
      }
    },[])

    const handleEdit = (cuisineId) =>{
      const selectedCuisine = cuisine.find((cuisine) => cuisine._id === cuisineId);

      if (selectedCuisine) {
        setCuisineToEdit(selectedCuisine);
        setShowModal(true);
      }
    }

    const handleUpdate = async (name,cuisineId)=>{
      try {
        const updatedCuisine = { ...cuisineToEdit, name }; 
        const res = await axiosInstance.put(`/hotel/updatedCuisine/${cuisineId}`,{name})
        if (res.data.sucess) {
          const updatedCuisines = cuisine.map(cuisine =>
            cuisine._id === cuisineId ? updatedCuisine : cuisine
          )

          setCuisine(updatedCuisines)
          setShowModal(false);
          toast.success(res.data.message)
        }else{
          console.log('Not Updated')
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'Error while Updating')
      }
    }

    const handleClick = (action,cuisineId)=>{
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          handleAction(action,cuisineId)
        } else {
          swal({title: `Cancel the ${action}`});
        }
      });
    }

    const handleAction = async (action, cuisineId) => {
      try {
        let updateCategory = [...cuisine]; // Create a copy of the current users array
    
        if (action === 'block') {
          const res = await axiosInstance.put(`/hotel/cuisineBlock/${cuisineId}`);
          if (res.data.success) {
            swal(res.data.message, {
              icon: "success",
            });
            // Update the user's 'isBlocked' property in the local state
            updateCategory = updateCategory.map((user) =>
            user._id === cuisineId ? { ...user, isBlocked: true } : user
          );
          }else{
            swal({
              title: res.data.message,
              icon: "error",
            });
          }
        }
    
        if (action === 'unblock') {
          const res = await axiosInstance.put(`/hotel/cuisineUnBlock/${cuisineId}`);
          
          if (res.data.success) {
            swal(res.data.message, {
              icon: "success",
            });
            updateCategory = updateCategory.map((user) =>
              user._id === cuisineId ? { ...user, isBlocked: false } : user
            );
          }else{
            swal({
              title: res.data.message,
              icon: "error",
            });
          }
        }
    
        setCuisine(updateCategory); // Update the state with the modified users array
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className='flex  h-screen'>
    <ToastContainer/>

    <HotelSideNav/>
    <EditCategory showModal={showModal} setShowModal={setShowModal} categoryToEdit={cuisineToEdit} handleUpdate={handleUpdate}/>
    <div className='flex-grow bg-gray-200 relative top-0 left-20'>
      <div>
        <HotelHeader/>
      </div>
      <div className='pl-8 mt-2'>
      <div>
      <div className="flex justify-between items-start">
        <p className="text-4xl mb-8 font-extrabold text-yellow-950">Food Category</p>
        <div className="">
        
          <Link to={HOTEL_ADD_CUSINE}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Add Cusine
          </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                SL.NO
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Cusine
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Remove
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cuisine?.map((cus,index) => {
              return (
                <>
                  <tr>
                  <td className="px-6 py-4 whitespace-no-wrap">
                      {index+1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {cus?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <button onClick={()=> handleEdit(cus._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    {cus?.isBlocked ? 
                      <button onClick={()=> handleClick('unblock',cus._id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Un-Block
                      </button> :
                    <>
                      <button onClick={()=> handleClick('block',cus._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Block
                      </button>
                    </>
                    }
                    </td>
                    
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
      </div>

      
    </div>
    
  </div>
  )
}

export default HotelCusine
