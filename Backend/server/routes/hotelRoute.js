import express from 'express'
import { addFoodItem, getFoodItem, hotelLogin, hotelRegister } from '../controller/hotelControler.js'
const route = express.Router()

route.post('/HotelRegister',hotelRegister)
route.post('/HotelLogin',hotelLogin)
route.post('/addFoodItem',addFoodItem)
route.get('/getFoodItem',getFoodItem)


export default route