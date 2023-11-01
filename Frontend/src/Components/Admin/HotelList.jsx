import React, { useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../api/axiosInstance'
import swal from 'sweetalert'

const HotelList = () => {
    const [hotels,sethotels]= useState()
    useEffect(()=>{
        try {
            adminAxiosInstance('/getHotels').then((res)=>{
                if (res.data.hotels) {
                    sethotels(res.data.hotels)
                }
            }).catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    })

    const handleClick = (action,userId)=>{
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          handleAction(action,userId)
        } else {
          swal({title: `Cancel the ${action}`});
        }
      });
    }

    const handleAction = async (action, userId) => {
        try {
          let updatedUsers = [...hotels]; // Create a copy of the current users array
      
          if (action === 'block') {
            const res = await adminAxiosInstance.put(`/blockHotel/${userId}`);
            if (res.data.success) {
              swal(res.data.message, {
                icon: "success",
              });
              // Update the user's 'isBlocked' property in the local state
              updatedUsers = updatedUsers.map((user) =>
                user._id === userId ? { ...user, isBlocked: true } : user
              );
            }else{
              swal({
                title: res.data.message,
                icon: "error",
              });
            }
          }
      
          if (action === 'unblock') {
            const res = await adminAxiosInstance.put(`/unBlockHotel/${userId}`);
            if (res.data.success) {
              swal(res.data.message, {
                icon: "success",
              });
              updatedUsers = updatedUsers.map((user) =>
                user._id === userId ? { ...user, isBlocked: false } : user
              );
            }else{
              swal({
                title: res.data.message,
                icon: "error",
              });
            }
          }
      
          sethotels(updatedUsers); // Update the state with the modified users array
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <main className='main-container'>
      <div className="flex justify-between items-start">
        <p className="text-5xl mb-8 font-extrabold">Hotels</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels?.map((hotel) => {
              return (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {hotel?.hotelName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {hotel?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {hotel?.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    {hotel?.isBlocked ? 
                      <button onClick={()=> handleClick('unblock',hotel._id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        unBlock
                      </button> :
                    <>
                      <button onClick={()=> handleClick('block',hotel._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
    </main>
  )
}

export default HotelList
