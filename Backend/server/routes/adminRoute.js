import express from 'express'
import { adminLogin, getUser, getRider,blockUser, unBlockUser,blockRider,unBlockRider} from '../controller/adminController.js'
import adminAuthMiddleware from '../middleware/adminProtect.js'

const route = express.Router()

route.post('/adminLogin',adminLogin)
route.get('/getUser', getUser)
route.get('/getRider',getRider)
route.put('/blockUser/:id',blockUser)
route.put('/unblockUser/:id',unBlockUser)
route.put('/blockRider/:id',blockRider)
route.put('/unblockRider/:id',unBlockRider)



export default route