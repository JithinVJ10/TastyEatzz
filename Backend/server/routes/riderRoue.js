import express from 'express'
import { riderLogin, riderRegister, riderVehicleDetails, riderBankDetails, 
    editRiderProfile, availableOrders, takeOrder, currentOrder
    } from '../controller/riderController.js'
const route = express.Router()

route.post('/riderRegister',riderRegister)
route.post('/riderLogin',riderLogin)
route.post('/riderVehicleDetails/:id',riderVehicleDetails)
route.post('/riderBankSetUp-Details/:id',riderBankDetails)
route.post('/UpdateRiderDetials/:id',editRiderProfile)

route.get('/availableOrders',availableOrders)
route.post('/takeOrder/:id',takeOrder)
route.get('/CurrentOrder/:id', currentOrder)



export default route