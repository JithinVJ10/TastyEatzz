import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { HOTEL_ADD_FOOD, HOTEL_CATEGORY, HOTEL_CUSINE } from "../../RoutePaths/RoutePaths";
import { axiosInstance } from "../../api/axiosInstance";

const FoodList = () => {
  const [foods, setFoods] = useState([])

  useEffect(()=>{
    axiosInstance.get('/hotel/getFoodItem').then((res)=>{
      if (res.data.food) {
        setFoods(res.data.food)
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <div>
      <div className="flex justify-between items-start">
        <p className="text-4xl mb-8 font-extrabold text-yellow-950">Foods</p>
        <div className="">
        <Link to={HOTEL_CATEGORY}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Add Category
          </button>
          </Link>
          <Link to={HOTEL_CUSINE}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Add Cusine
          </button>
          </Link>
          <Link to={HOTEL_ADD_FOOD}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Add Items
          </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Food item
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Catagory
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Available time
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Change
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foods?.map((food) => {
              return (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.category}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <img src={food.imageUrl} className="w-16" alt="" />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">

                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FoodList