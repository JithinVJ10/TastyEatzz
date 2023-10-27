import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { Cloud_name, Upload_preset, imageUploadURL } from "../../api/cloudinaryAPI";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function EditFoodModel({showModal,setShowModal, foodToEdit}) {

  
  const [foodData, setfoodData] = useState({
    name: "",
    category: null,
    cuisineType: null,
    description: "",
    price: null,
    availableFrom: null,
    availableTo: null,
  });
  
  useEffect(() => {
    if (foodToEdit) {
      const formatTime = (time) => {
        const date = new Date(time);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      setfoodData({
        name: foodToEdit.name || "",
        category: foodToEdit.category ? foodToEdit.category.name : null,
        cuisineType: foodToEdit.cuisineType ? foodToEdit.cuisineType.name : null,
        description: foodToEdit.description || "",
        price: foodToEdit.price || null,
        availableFrom: formatTime(foodToEdit.availableFrom) || null,
        availableTo: formatTime(foodToEdit.availableTo) || null,
      });
    }
  }, [foodToEdit]);
  

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

    const [categories,setCategories]= useState([])
    const [cuisineOption,setCuisineOption] = useState([])
    
    // Fetch category and Cuisine
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
  
      try {
        axiosInstance.get('/hotel/getCuisine').then((res)=>{
          if (res.data.cuisine) {
            setCuisineOption(res.data.cuisine)
          }else{
            console.log('cuisine not found');
          }
        })
      } catch (error) {
        console.log(error);
      }
    },[])

    // handle Image Changes
    const handleImageChange = (e)=>{
        setPhoto(e.target.files[0]);
    }

    // update food items
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
    
        axiosInstance.post('/hotel/UpdateFoodItem',{
          name:foodData.name,
          category:foodData.category,
          cuisineType:foodData.cuisineType,
          description:foodData.description,
          price:foodData.price,
          imageUrl:urlImage,
          availableFrom:foodData.availableFrom,
          availableTo:foodData.availableTo,
          hotelName: hotelCred._id,
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
          toast.error(error.response?.data?.message)
          console.log(error);
        })
    
    };
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Food Items
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="m-3">
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
                            required
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
                            required
                        >
                            <option value=''>Select option</option>
                            {categories.map((catg)=>{
                            return (
                                <>
                                <option key={catg._id} value={catg._id}>{catg.name}</option>
                                </>
                            )
                            })}
                            
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
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='CuisineType' className=''>Cuisine Type</label>
                            <select
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={foodData.cuisineType}
                            name='cuisineType'
                            id='cuisineType'
                            onChange={handleInputChange}
                            required
                        >
                            <option value=''>Select option</option>
                            {cuisineOption.map((cuis)=>{
                            return (
                                <>
                                <option key={cuis._id} value={cuis._id}>{cuis.name}</option>
                                </>
                            )
                            })}
                            
                        </select>
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
                            required
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
                            required
                            />
                        </div>
                        <div className='flex'>

                        <div className='p-1'>
                            <label htmlFor='availableFrom' className=''>Available From</label>
                            <input 
                            type="time"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={foodData.availableFrom}
                            name='availableFrom'
                            id='availableFrom'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        <div className='p-1'>
                            <label htmlFor='availableTo' className=''>Available To</label>
                            <input 
                            type="time"
                            className='block w-full px-3 py-1 mt-1 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            value={foodData.availableTo}
                            name='availableTo'
                            id='availableTo'
                            onChange={handleInputChange}
                            required
                            />
                        </div>
                        </div>
                        {foodData.category}, {foodData.cuisineType}
                        
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
                    </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}