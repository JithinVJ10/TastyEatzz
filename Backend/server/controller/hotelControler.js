import Hotel from "../model/hotelModel.js"
import Food from "../model/foodModel.js"
import jwt from "jsonwebtoken"
import {Category, CuisineType } from '../model/menuModel.js'


// generate jwt
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_Secret,{expiresIn:'30d'})
}

const hotelRegister = async (req,res,next)=>{
    
    try {
        const {email,hotelName,phone,password} = req.body
        console.log(email, hotelName);

        const existingHotel = await Hotel.findOne({email})

        if (existingHotel) {
            const error = new Error('User already exists');
            error.statusCode = 409; // You can set a custom status code if needed
            throw error; // Throw the error
        }

        const hotel = await Hotel.create({
            hotelName,
            email,
            phone,
            password,
        });

        if (hotel) {
            res.status(201).json({
              hotel,
              message : 'Account created successfully'
            });
          } else {
            res.status(400);
            throw new Error('Invalid User data');
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const hotelLogin = async (req,res, next )=>{
    try {
        const {email, password} = req.body
        console.log(email);
        
        const hotel = await Hotel.findOne({email})
        console.log(hotel);

        if (hotel && (await hotel.matchPassword(password))) {
          const token = generateToken(hotel._id)
          res.json({
            message: "Succesfully loggged in",
            hotel,
            token
          })
        }else{
          res.status(400)
          throw new Error("Invaild Email or password")
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const addFoodItem = async (req,res,next)=>{
  try {
    const {name,category,cuisineType,description,price,imageUrl,availableFrom,availableTo,hotelName} =req.body
    console.log(name);

    const foodItem = await Food.create({
      name,category,cuisineType,description,price,imageUrl,availableFrom,availableTo,hotelName
    })

    if (foodItem) {
      res.status(200).json({message:'Sucess',foodItem})
    }else{
      res.status(400)
      console.log('eeeeeeeee');
      throw new Error("Internal Error")
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}

const getFoodItem = async (req,res,next)=>{
  try {
    const food = await Food.find().populate('cuisineType').populate('category')

    if (food) {
      res.status(200).json({
        message:"food items",
        food
      })
    }else{
      res.status(400)
      console.log('eeeeeeeee');
      throw new Error("Internal Error while fetch food")
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}

const addCategory = async (req,res,next)=>{
  try {
    const {name} = req.body

    const existingCategory = await Category.findOne({name})

    if (existingCategory) {
      const error = new Error('Category already exists');
      error.statusCode = 409; // You can set a custom status code if needed
      throw error; // Throw the error
    }

    const category = await Category.create({name})

    if (category) {
      res.status(200).json({message:'Category added',category})
    }else{
      const error = new Error('Error While add Category');
      error.statusCode = 501; // You can set a custom status code if needed
      throw error;
    }

  } catch (error) {
    console.log(error);
    next(error)
  }
}

const getCategory = async (req,res,next)=>{
  try {
    const categories = await Category.find()

    if (categories) {
      res.status(201).json({message:"Successfully Fetched Category",categories})
    }else{
      console.log('Server Error while fetching category');
      const error = new Error('Server Error while fetching category');
      error.statusCode = 501; // You can set a custom status code if needed
      throw error;

    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}

const addCuisine = async (req,res,next)=>{
    try {
      const {name} = req.body
  
      const existingCusine = await CuisineType.findOne({name})
  
      if (existingCusine) {
        const error = new Error('Cuisine already exists');
        error.statusCode = 409; // You can set a custom status code if needed
        throw error; // Throw the error
      }
  
      const cuisine = await CuisineType.create({name})
  
      if (cuisine) {
        res.status(200).json({message:'cuisine added',cuisine})
      }else{
        const error = new Error('Error While add cuisine');
        error.statusCode = 501; // You can set a custom status code if needed
        throw error;
      }
  
    } catch (error) {
      console.log(error);
      next(error)
    }
}

const getCuisine = async (req,res,next)=>{
  try {
    const cuisine = await CuisineType.find()

    if (cuisine) {
      res.status(201).json({message:"Successfully Fetched cuisine",cuisine})
    }else{
      console.log('Server Error while fetching category');
      const error = new Error('Server Error while fetching category');
      error.statusCode = 501; // You can set a custom status code if needed
      throw error;

    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}

const UpdateFoodItem = (req,res,next)=>{

}

export {
  hotelRegister, hotelLogin, addFoodItem,getFoodItem,
  addCategory,getCategory, addCuisine, getCuisine,UpdateFoodItem
}