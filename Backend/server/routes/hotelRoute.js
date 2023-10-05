import express from 'express'
import { hotelLogin, hotelRegister } from '../controller/hotelControler.js'
const route = express.Router()

route.post('/HotelRegister',hotelRegister)
route.post('/HotelLogin',hotelLogin)


export default route