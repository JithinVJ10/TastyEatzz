import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { HOTEL_ADD_FOOD, HOTEL_CATEGORY, HOTEL_CUSINE } from "../../RoutePaths/RoutePaths";
import { axiosInstance } from "../../api/axiosInstance";
import EditFoodModel from "./EditFoodModel";

const FoodList = () => {
  const [showModal, setShowModal] = useState(false)
  const [foodToEdit, setFoodToEdit] = useState()
  const [foods, setFoods] = useState([])

  useEffect(()=>{
    axiosInstance.get('/hotel/getFoodItem').then((res)=>{
      if (res.data.food) {
        setFoods(res.data.food)
        console.log(res.data.food)
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  const handleUpdate = (foodId) => {
    const selectedFood = foods.find((food) => food._id === foodId);
    console.log("Selected Food:", selectedFood);
    console.log("Food ID:", foodId);

    // Make sure the selectedFood is not undefined
    if (selectedFood) {
      setFoodToEdit(selectedFood);
      setShowModal(true);
    }
  }
  return (
    <div>
      <div className="flex justify-between items-start">
        <p className="text-4xl mb-8 font-extrabold text-yellow-950">Foods</p>
        <div className="">
        <Link to={HOTEL_CATEGORY}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Category
          </button>
          </Link>
          <Link to={HOTEL_CUSINE}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Cusine
          </button>
          </Link>
          <Link to={HOTEL_ADD_FOOD}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
            Add Items
          </button>
          </Link>
        </div>
      </div>
      <EditFoodModel showModal={showModal} setShowModal={setShowModal} foodToEdit={foodToEdit}/>
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
              Cuisine
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Price
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Image
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
                  <tr key={food._id}>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.category?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.cuisineType?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {food?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <img src={food.imageUrl} className="w-16" alt="" />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <button onClick={()=>handleUpdate(food._id)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3">
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
  )
}

export default FoodList