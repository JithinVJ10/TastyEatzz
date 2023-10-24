import React, { useEffect, useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import { HOTEL_ADD_CATEGORY } from '../../RoutePaths/RoutePaths'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../api/axiosInstance'

const HotelCategory = () => {
    const [categories, setCategories] = useState()
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
    },[categories])
  return (
    <div className='flex  h-screen'>
      

    <HotelSideNav/>
    
    <div className='flex-grow bg-gray-200 relative top-0 left-20'>
      <div>
        <HotelHeader/>
      </div>
      <div className='pl-8 mt-2'>
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                      Remove
                    </button>
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

export default HotelCategory