import express from 'express'
import { 
    UpdateFoodItem, addCategory, addCuisine, addFoodItem, getCategory, 
    getCuisine, getFoodItem, hotelLogin, hotelRegister 
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

export default route