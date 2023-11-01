import express from 'express'
import { 
    adminLogin, getUser, getRider,blockUser, unBlockUser,blockRider,unBlockRider, getHotels, blockHotel, unBlockHotel
} from '../controller/adminController.js'
import adminAuthMiddleware from '../middleware/adminProtect.js'

const route = express.Router()

route.post('/adminLogin',adminLogin)
route.get('/getUser',adminAuthMiddleware, getUser)
route.get('/getRider',adminAuthMiddleware,getRider)
route.get('/getHotels',adminAuthMiddleware,getHotels)
route.put('/blockUser/:id',adminAuthMiddleware,blockUser)
route.put('/unblockUser/:id',adminAuthMiddleware,unBlockUser)
route.put('/blockRider/:id',adminAuthMiddleware,blockRider)
route.put('/unblockRider/:id',adminAuthMiddleware,unBlockRider)
route.put('/blockHotel/:id',adminAuthMiddleware,blockHotel)
route.put('/unBlockHotel/:id',adminAuthMiddleware,unBlockHotel)


export default route