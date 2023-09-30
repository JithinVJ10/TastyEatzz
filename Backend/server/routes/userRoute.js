import express from 'express'
import { userRegister, userLogin, googleSignup, googleLogin, UpdateUserDetials } from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'

const route = express.Router()

route.get('/',(req,res)=>{
    res.send('User side')
})

route.post('/userRegister',userRegister)
route.post('/userLogin',userLogin)
route.post('/googleSignUp',googleSignup)
route.post('/googleLogin',googleLogin)
route.post('/UpdateUserDetials/:id',UpdateUserDetials)


export default route