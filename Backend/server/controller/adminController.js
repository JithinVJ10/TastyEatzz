import User from '../model/userModel.js'
import Rider from '../model/riderModel.js'
import Hotel from '../model/hotelModel.js'
import { blockUnblockHelper } from '../utils/blockUnblockHelper.js'
import generateToken from '../utils/generateToken.js'


const adminCred = {
    AdminEmail:'admin@gmail.com',
    AdminPassword: '1234'
}

// admin Login POST /adminLogin
const adminLogin = async (req,res,next)=>{
    try {
       const {adminEmail, adminPassword} = req.body
       console.log(adminEmail);

       if (adminCred.AdminEmail === adminEmail && adminCred.AdminPassword === adminPassword) {
        const token = generateToken(adminCred.AdminEmail)
        res.status(200).json({
            message:"Successfully Logged in",
            email: adminCred.AdminEmail,
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


// fetch all users

const getUser = async (req,res,next)=>{
    try {
       
        const user = await User.find()

        
        if (user) {
            
            res.status(200).json({
                message:"All user data Fetched",
                user
            })
        }else{
          res.status(500);
          throw new Error('Server Error');
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//get Rider Data

const getRider = async (req,res,next)=>{
    try {
        const rider = await Rider.find()

        if (rider) {
            res.status(200).json({
                message:"All rider Data",
                rider
            })
        }else{
            res.status(500);
            throw new Error('Server Error');
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Get Hotels

const getHotels = async (req,res,next)=>{
  try {
    const hotels = await Hotel.find()

    if (hotels) {
        res.status(200).json({
            message:"All rider Data",
            hotels
        })
    }else{
        res.status(500);
        throw new Error('Server Error Hotels not found');
    }
} catch (error) {
    console.log(error);
    next(error)
}
}
  
  // User Block and UnBlock
  const blockUser = (req, res, next) => {
    blockUnblockHelper(req, res, next, true ,User);
  };
  
  const unBlockUser = (req, res, next) => {
    blockUnblockHelper(req, res, next, false, User);
  };
  
  // Rider Block and UnBlock
  const blockRider = (req, res, next) => {
    blockUnblockHelper(req, res, next, true, Rider);
  };
  
  const unBlockRider = (req, res, next) => {
    blockUnblockHelper(req, res, next, false, Rider);
  };

  // Hotel Block and UnBlock
  const blockHotel = (req,res, next )=>{
    blockUnblockHelper(req,res, next, true, Hotel)
  }

  const unBlockHotel = (req,res, next )=>{
    blockUnblockHelper(req,res, next, false, Hotel)
  }
  


export {
  adminLogin, getUser,getRider,
  blockUser,unBlockUser,blockRider,unBlockRider,getHotels,
  blockHotel,unBlockHotel
}