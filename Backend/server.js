import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import userRoute from './server/routes/userRoute.js'
import adminRoute from './server/routes/adminRoute.js'
import riderRoute from './server/routes/riderRoue.js'
import connectDB from './server/config/database.js'
import { notFound, errorHandler } from './server/middleware/errorMiddleware.js'

const app = express()

const PORT = process.env.PORT || 5000
connectDB();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',userRoute)
app.use('/admin',adminRoute)
app.use('/rider',riderRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=> console.log(`Server Started on ${PORT}`))