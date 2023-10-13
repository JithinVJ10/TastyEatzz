import Hotel from "../model/hotelModel.js"
import Food from "../model/foodModel.js"
import jwt from "jsonwebtoken"

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
    const {name,category,cuisineType,description,price,imageUrl,availableFrom,availableTo} =req.body
    console.log(name);

    const foodItem = await Food.create({
      name,category,cuisineType,description,price,imageUrl,availableFrom,availableTo
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
    const food = await Food.find()

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


export {hotelRegister, hotelLogin, addFoodItem,getFoodItem}