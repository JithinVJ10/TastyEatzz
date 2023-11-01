import express from 'express'
import { 
    UpdateFoodItem, addCategory, addCuisine, addFoodItem, categoryBlock, categoryUnBlock, cuisineBlock, 
    cuisineUnBlock, foodItemBlock, foodItemUnBlock, getCategory, 
    getCuisine, getFoodItem, hotelLogin, hotelRegister, updateCategory, updatedCuisine
} from '../controller/hotelControler.js'
const route = express.Router()

route.post('/HotelRegister',hotelRegister)
route.post('/HotelLogin',hotelLogin)
route.post('/addFoodItem',addFoodItem)
route.get('/getFoodItem',getFoodItem)
route.post('/addCategory',addCategory)
route.get('/getCategory',getCategory)
route.post('/addCuisine',addCuisine)
route.get('/getCuisine',getCuisine)

//update food item
route.put('/UpdateFoodItem/:id',UpdateFoodItem)
route.put('/foodItemBlock/:id',foodItemBlock)
route.put('/foodItemUnBlock/:id',foodItemUnBlock)
// Update Category
route.put('/updateCategory/:id',updateCategory)
route.put('/categoryBlock/:id',categoryBlock)
route.put('/categoryUnBlock/:id',categoryUnBlock)
// Update Cuisine
route.put('/updatedCuisine/:id',updatedCuisine)
route.put('/cuisineBlock/:id',cuisineBlock)
route.put('/cuisineUnBlock/:id',cuisineUnBlock)

export default route