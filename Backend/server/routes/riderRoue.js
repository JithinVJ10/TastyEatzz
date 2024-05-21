import express from 'express'
import { riderLogin, riderRegister, riderVehicleDetails, riderBankDetails, 
    editRiderProfile, availableOrders, takeOrder, currentOrder
    } from '../controller/riderController.js'
import { riderProtect } from '../middleware/authMiddleware.js'
const route = express.Router()

route.post('/riderRegister',riderRegister)
route.post('/riderLogin',riderLogin)
route.post('/riderVehicleDetails/:id',riderVehicleDetails)
route.post('/riderBankSetUp-Details/:id',riderBankDetails)
route.post('/UpdateRiderDetials/:id',editRiderProfile)

route.get('/availableOrders',riderProtect,availableOrders)
route.post('/takeOrder/:id',riderProtect,takeOrder)
route.get('/CurrentOrder/:id',riderProtect, currentOrder)



export default route