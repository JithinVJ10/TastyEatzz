import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'
import Rider from '../model/riderModel.js'

// generate jwt
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_Secret,{expiresIn:'30d'})
}

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


const blockUnblockUser = async (req, res, next, isBlocked,Model) => {
    try {
      const UserId = req.params.id;
  
      const user = await Model.findByIdAndUpdate(
        UserId,
        {
          isBlocked: isBlocked,
        },
        { new: true }
      );
  
      if (user) {
        const message = isBlocked ? "Successfully blocked" : "Successfully unblocked";
        res.status(200).json({ message });
      } else {
        res.status(500).json({ message: "Server Error" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  const blockUser = (req, res, next) => {
    blockUnblockUser(req, res, next, true ,User);
  };
  
  const unBlockUser = (req, res, next) => {
    blockUnblockUser(req, res, next, false, User);
  };
  
  const blockRider = (req, res, next) => {
    blockUnblockUser(req, res, next, true, Rider);
  };
  
  const unBlockRider = (req, res, next) => {
    blockUnblockUser(req, res, next, false, Rider);
  };
  


export {adminLogin, getUser,getRider,blockUser,unBlockUser,blockRider,unBlockRider}