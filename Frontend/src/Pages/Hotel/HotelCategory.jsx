import React, { useEffect, useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import { HOTEL_ADD_CATEGORY } from '../../RoutePaths/RoutePaths'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'
import EditCategory from '../../Components/Hotel/EditCategory'
import {toast,ToastContainer} from 'react-toastify'
import swal from 'sweetalert'

const HotelCategory = () => {
    const [categories, setCategories] = useState()
    const [categoryToEdit,setCategoryToEdit] = useState()
    const [showModal,setShowModal] = useState(false)

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    useEffect(()=>{
      try {
        axiosInstance.get('/hotel/getCategory').then((res)=>{
          if (res.data.categories) {
            setCategories(res.data.categories)
          }else{
            console.log('Category not found');
          }
        })
      } catch (error) {
        console.log(error);
      }
    },[])

    const handleEdit = (categoryId) =>{
      const selectedCat = categories.find((category) => category._id === categoryId);

      if (selectedCat) {
        setCategoryToEdit(selectedCat);
        setShowModal(true);
      }
    }

    const handleUpdate = async (name,categoryId)=>{
      try {
        const updatedCategory = { ...categoryToEdit, name }; 
        const res = await axiosInstance.put(`/hotel/updateCategory/${categoryId}`,{name})
        if (res.data.sucess) {
          const updatedCategories = categories.map(category =>
            category._id === categoryId ? updatedCategory : category
          )

          setCategories(updatedCategories)
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

    const handleClick = (action,categoryId)=>{
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          handleAction(action,categoryId)
        } else {
          swal({title: `Cancel the ${action}`});
        }
      });
    }
  
    const handleAction = async (action, categoryId) => {
      try {
        let updateCategory = [...categories]; // Create a copy of the current users array
    
        if (action === 'block') {
          const res = await axiosInstance.put(`/hotel/categoryBlock/${categoryId}`);
          if (res.data.success) {
            swal(res.data.message, {
              icon: "success",
            });
            // Update the user's 'isBlocked' property in the local state
            updateCategory = updateCategory.map((user) =>
            user._id === categoryId ? { ...user, isBlocked: true } : user
          );
          }else{
            swal({
              title: res.data.message,
              icon: "error",
            });
          }
        }
    
        if (action === 'unblock') {
          const res = await axiosInstance.put(`/hotel/categoryUnBlock/${categoryId}`);
          
          if (res.data.success) {
            swal(res.data.message, {
              icon: "success",
            });
            updateCategory = updateCategory.map((user) =>
              user._id === categoryId ? { ...user, isBlocked: false } : user
            );
          }else{
            swal({
              title: res.data.message,
              icon: "error",
            });
          }
        }
    
        setCategories(updateCategory); // Update the state with the modified users array
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className='grid-container'>
      <ToastContainer/>
      

      <HotelSideNav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <HotelHeader OpenSidebar={OpenSidebar}/>
      
      <EditCategory showModal={showModal} setShowModal={setShowModal} categoryToEdit={categoryToEdit} handleUpdate={handleUpdate}/>
      {/* // main */}
      <main className='main-container'>
      <div>
      <div className="flex justify-between items-start">
        <p className="text-4xl mb-8 font-extrabold text-yellow-950">Food Category</p>
        <div className="">
        
          <Link to={HOTEL_ADD_CATEGORY}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Add Category
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
                Catagory
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
            {categories?.map((category,index) => {
              return (
                <>
                  <tr>
                  <td className="px-6 py-4 whitespace-no-wrap">
                      {index+1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {category?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <button onClick={()=> handleEdit(category._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    {category?.isBlocked ? 
                      <button onClick={()=> handleClick('unblock',category._id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Un-Block
                      </button> :
                    <>
                      <button onClick={()=> handleClick('block',category._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
    </main>

      
    
  </div>
  )
}

export default HotelCategory
