import Hotel from "../model/hotelModel.js"
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


export {hotelRegister, hotelLogin}