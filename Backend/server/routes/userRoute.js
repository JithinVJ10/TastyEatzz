import express from 'express'
import { userRegister, userLogin, googleSignup, googleLogin, UpdateUserDetials, getSingleProduct, addTocart, getCart, quantityIncrease, quantityDecrease } from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'
import { sendOTP, verifyOTP } from '../controller/twilio.js'

const route = express.Router()

route.get('/',(req,res)=>{
    res.send('User side')
})

route.post('/userRegister',userRegister)
route.post('/userLogin',userLogin)
route.post('/googleSignUp',googleSignup)
route.post('/googleLogin',googleLogin)

//OTP LOGIN
route.post('/SendOTP',sendOTP)
route.post('/OTPverify',verifyOTP)

route.post('/UpdateUserDetials/:id',UpdateUserDetials)

//Products
route.get('/getSingleProduct/:id',getSingleProduct)
// addTocart
route.post('/addTocart/:id',addTocart)
//getCart
route.get('/getCart/:id',getCart)
//Quantity update
route.patch('/quantityIncrease',quantityIncrease)
route.patch('/quantityDecrease',quantityDecrease)


export default route