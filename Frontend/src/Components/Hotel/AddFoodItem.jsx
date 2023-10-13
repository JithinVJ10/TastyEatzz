import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {axiosInstance} from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { HOTEL_FOOD } from '../../RoutePaths/RoutePaths'
import { Cloud_name, imageUploadURL, Upload_preset } from '../../api/cloudinaryAPI'

const AddFoodItem = () => {
  const [foodData, setfoodData] = useState({
    name:'',
    category:'',
    cuisineType:'',
    description:'',
    price:null,
    availableFrom:null,
    availableTo:null
  })

  let urlImage

  const navigate = useNavigate()

  const [photo,setPhoto]= useState(null)
  const [cloudinaryURL, setCloudinaryURL] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setfoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleImageChange = (e)=>{
    setPhoto(e.target.files[0]);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", Upload_preset);
      formData.append("cloud_name", Cloud_name);
      const response = await axios.post(
        imageUploadURL,
        formData
      );
      
      
      console.log(response.data)
      urlImage = response.data.secure_url
      setCloudinaryURL(urlImage)

      console.log(cloudinaryURL,'ggggggg')
      if (!urlImage) {
        toast.error("Error uploading photo")
        return
      }

      
    } catch (error) {
      console.error("Error uploading photo2", error);
    }

    axiosInstance.post('/hotel/addFoodItem',{
      name:foodData.name,
      category:foodData.category,
      cuisineType:foodData.cuisineType,
      description:foodData.description,
      price:foodData.price,
      imageUrl:urlImage,
      availableFrom:foodData.availableFrom,
      availableTo:foodData.availableTo,
    }).then((res)=>{
      if (res.data.foodItem) {
        console.log(res.data.fooditem,'dsdqwdqeeeeeeee');
        setTimeout(()=>{
          navigate(HOTEL_FOOD)
        },2000)
        toast.success('Sucess')
      }
    }).catch((error)=>{
      console.log('fdhsfdeeeeeeeeeee');
      toast.error(error)
      console.log(error);
    })

    console.log(foodData);
  };


  return (
    <div>
      <ToastContainer/>
      <div>
        <form onSubmit={handleSubmit}>
            <div className='p-1'>
                <label htmlFor='name' className=''>Name</label>
                <input 
                type="text"
                className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                value={foodData.name}
                name='name'
                id='name'
                onChange={handleInputChange}
                />
            </div>
            <div className='p-1'>
              <label htmlFor='category' className=''>Category</label>
              <select
                className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                value={foodData.category}
                name='category'
                id='category'
                onChange={handleInputChange}
              >
                <option value='option1'>Select option</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className='p-1'>
                <label htmlFor='description' className=''>Description</label>
                <input 
                type="text"
                className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                value={foodData.description}
                name='description'
                id='description'
                onChange={handleInputChange}
                />
            </div>
            <div className='p-1'>
                <label htmlFor='CuisineType' className=''>Cuisine Type</label>
                <input 
                type="text"
                className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                value={foodData.cuisineType}
                name='cuisineType'
                id='cuisineType'
                onChange={handleInputChange}
                />
            </div>
            <div className='p-1'>
                <label htmlFor='price' className=''>Price</label>
                <input 
                type="number"
                className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                value={foodData.price}
                name='price'
                id='price'
                onChange={handleInputChange}
                />
            </div>
            <div className='p-1'>
                <label htmlFor='imageUrl' className=''>Photo</label>
                <input 
                type="file"
                className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                value={foodData.imageUrl}
                name='photo'
                id='photo'
                onChange={handleImageChange}
                />
            </div>
            <div className='flex'>

              <div className='p-1'>
                  <label htmlFor='availableFrom' className=''>Available From</label>
                  <input 
                  type="date"
                  className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  value={foodData.availableFrom}
                  name='availableFrom'
                  id='availableFrom'
                  onChange={handleInputChange}
                  />
              </div>
              <div className='p-1'>
                  <label htmlFor='availableTo' className=''>Available To</label>
                  <input 
                  type="date"
                  className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  value={foodData.availableTo}
                  name='availableTo'
                  id='availableTo'
                  onChange={handleInputChange}
                  />
              </div>
            </div>
            
            <div className='mt-5'>
                <button className='bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-md hover:bg-blue-600 focus:outline-none text-base font-semibold' type="submit">
                    ADD
                </button>
            </div>
            
        </form>
      </div>
    </div>
  )
}

export default AddFoodItem
