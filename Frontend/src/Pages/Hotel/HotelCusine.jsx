import React, { useEffect, useState } from 'react'
import HotelSideNav from '../../Components/Hotel/HotelSideNav'
import HotelHeader from '../../Components/Hotel/HotelHeader'
import { Link } from 'react-router-dom'
import { HOTEL_ADD_CUSINE } from '../../RoutePaths/RoutePaths'
import { axiosInstance } from '../../api/axiosInstance'

const HotelCusine = () => {
    const [cuisine, setCuisine] = useState()
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

export default HotelCusine
