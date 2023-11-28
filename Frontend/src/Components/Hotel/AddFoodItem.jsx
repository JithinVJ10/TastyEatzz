import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {axiosInstance} from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { HOTEL_FOOD } from '../../RoutePaths/RoutePaths'
import { Cloud_name, imageUploadURL, Upload_preset } from '../../api/cloudinaryAPI'
import { useSelector } from 'react-redux'

const AddFoodItem = () => {
  const {hotelCred} = useSelector((state)=>state.hotel)
  const [foodData, setfoodData] = useState({
    name:'',
    category:null,
    cuisineType:null,
    description:'',
    price:null,
    
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

  
  // handel sumbit 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedPrice = parseFloat(foodData.price);
        
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErr('Invalid Price value (should be a negative number)');
     
      setTimeout(() => {
        setErr('');
      }, 2000);

      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']; 
        const fileExtension = photo.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          setErr('Invalid file type. Please upload a JPG, JPEG, PNG, or GIF image.');
          console.log('Invalid file type');
          setTimeout(() => {
            setErr('');
          }, 2000);
          return;
        }



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

  // fetching cat and cuisine

  const [categories,setCategories]= useState([])
  const [cuisineOption,setCuisineOption] = useState([])

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
      
    }
  },[])


  return (
    <main className='main-container'>
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

           
            
            <div className='mt-5'>
                <button className='bg-blue-500 text-white px-4 py-2 border border-gray-300 rounded-md hover:bg-blue-600 focus:outline-none text-base font-semibold' type="submit">
                    ADD
                </button>
            </div>
            
        </form>
      </div>
    </main>
  )
}

export default AddFoodItem
