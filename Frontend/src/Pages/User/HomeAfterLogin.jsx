import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/Header/Header'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import HeroMain from '../../Components/User/Hero/HeroMain'
import OfferCard from '../../Components/User/Card/OfferCard'
import CategoryRow from '../../Components/User/Card/CategoryRow'
import ProductCard from '../../Components/User/ProductsList/ProductCard'
import Footer from '../../Components/User/Footer/Footer'
import { axiosInstance } from '../../api/axiosInstance'


const HomeAfterLogin = () => {
  const [catagory,setCategory] = useState()
  const [products,setProducts] = useState([])
  const [selectedCategory,setSelectedCategory] =useState('all')
  const [searchQuery, setSearchQuery] = useState('');


  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    axiosInstance.get('/hotel/getFoodItem')
      .then((res) => {
        if (res.data.food) {
          // Filter out the unblocked food items
          const unblockedFood = res.data.food.filter(item => !item.isBlocked);
          setProducts(unblockedFood);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    try {
      axiosInstance.get('/getCategory').then((res)=>{
        if (res.data.success) {
          setCategory(res.data.category)
        }
      })
      
    } catch (error) {
      console.log(error);
    }

    if (selectedCategory === null) {
      setSelectedCategory(catagory)
    }
  },[])

  

  const filterCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  }
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }
  

  return (
    <div className='min-h-screen flex flex-col w-full'>
        <Header 
          value={searchQuery}
          onChange={handleSearch} 
        />
        <HeroMain/>
        <div className='mt-20 px-20'>
          <p className='font-bold text-3xl'>Best offers for you</p>
        </div>
        <div className='flex flex-col md:flex-row px-20 w-full mt-10'>
          <OfferCard title={'Get up to 60%'} text={'Off on your next order'} bgColor={'bg-red-400'}/>
          <OfferCard title={'Get 15% off'} text={'Off for Biriyani'} bgColor={'bg-lime-500'}/>
          <OfferCard title={'Get 10% off'} text={'Off on your next order'} bgColor={'bg-cyan-700'}/>
        </div>
        <div className='mt-20 flex px-20'>
          <div className='cursor-pointer' key="all" onClick={() => filterCategory('all')}>
            <CategoryRow category={'Show All'} />
          </div>
          {catagory?.map((item)=>{
            return (
              <>
              <div key={item._id} className='cursor-pointer' onClick={()=>filterCategory(item._id)}>
                <CategoryRow category={item.name} />
              </div>
              </>
            )
          })}
        </div>
        <div className='px-20'>
          <ProductCard title={'Polular Food Items'} products={products} selectedCategory={selectedCategory} searchQuery={searchQuery}/>
        </div>
        <div className='px-20'>
          <ProductCard title={'South Indian Food Items'} products={products} selectedCategory={selectedCategory} searchQuery={searchQuery}/>
        </div>
        <div className="">
          <Footer />
        </div>
      
    </div>
  )
}

export default HomeAfterLogin
