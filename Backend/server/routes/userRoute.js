import express from 'express'
import { userRegister, userLogin, googleSignup, googleLogin, UpdateUserDetials, getSingleProduct, 
    addTocart, getCart, quantityIncrease, quantityDecrease, getLoggedInUser, addUserAddress, getAddress, 
    updateAddress, getSelectedAddress, placeOrder, deleteCartItem, getCategory, getOrders, getSingleOrder 
} from '../controller/userController.js'
import {protect} from '../middleware/authMiddleware.js'
import { sendOTP, verifyOTP } from '../controller/twilio.js'


const route = express.Router()

route.get('/',(req,res)=>{
    res.send('User side')
})

route.post('/userRegister',userRegister)
route.post('/userLogin',userLogin)
route.post('/googleSignUp',googleSignup)
route.post('/googleLogin',googleLogin)
route.get('/getLoggedInUser/:id',getLoggedInUser)

//OTP LOGIN
route.post('/SendOTP',sendOTP)
route.post('/OTPverify',verifyOTP)

route.post('/UpdateUserDetials/:id',protect,UpdateUserDetials)
route.post('/addUserAddress/:id',protect,addUserAddress)
route.get('/getAddress/:id',protect,getAddress)
route.post('/UpdateUserAddress/:id',protect,updateAddress)
route.get('/getSelectedAddress/:id',protect,getSelectedAddress)
//Products
route.get('/getSingleProduct/:id',protect,getSingleProduct)
route.get('/getCategory',getCategory)
// addTocart
route.post('/addTocart/:id',protect,addTocart)
//getCart
route.get('/getCart/:id',protect,getCart)
//Quantity update
route.patch('/quantityIncrease',quantityIncrease)
route.patch('/quantityDecrease',quantityDecrease)

route.put('/deleteCartItem',protect,deleteCartItem)

route.post('/placeOrder',protect,placeOrder)

route.get('/getOrders/:id',protect,getOrders)
route.get('/getSingleOrder/:id',protect,getSingleOrder)




export default route