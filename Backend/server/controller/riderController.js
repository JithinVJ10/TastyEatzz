import Rider from '../model/riderModel.js'
import generateToken from '../utils/generateToken.js';
import Order from '../model/orderModel.js'
import mongoose from "mongoose";



// Rider registeration
const riderRegister = async (req,res,next)=>{
    try {
        const {email,username,phone,password} = req.body
        console.log(email, username);

        const existingUser = await Rider.findOne({email})

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409; // You can set a custom status code if needed
            throw error; // Throw the error
        }

        const rider = await Rider.create({
            username,
            email,
            phone,
            password,
        });

        if (rider) {
            res.status(201).json({
              _id: rider._id,
              name: rider.username,
              email: rider.email,
              phone: rider.phone,
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

// Rider Login
const riderLogin = async (req,res,next)=>{
    try {
        const {email, password} = req.body
        console.log(email);
        
        const rider = await Rider.findOne({email})

        if (rider && (await rider.matchPassword(password))) {
          const token = generateToken(rider._id)
          console.log(token);
          res.json({
            rider,
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

const riderVehicleDetails = async (req,res,next)=>{
  try {
    const {id} = req.params
    const {VehicleModel,VehicleNo,RcNumber,LicenseId} = req.body
    console.log(id);
    console.log(VehicleModel);

    const rider = await Rider.findById({_id: id})

    if (rider) {
      
      rider.VehicleDetails = {
        VehicleModel,
        VehicleNo,
        RcNumber,
        LicenseId,
      };

    await rider.save()

      console.log('sssssssssss');
      res.json({rider})
    }else{
      console.log('eeeeeeeeee');
      res.status(500)
      throw new Error("Server")

    }

  } catch (error) {
    console.log(error);
    next(error)
  }
}

// Rider Bank Details saving

const riderBankDetails = async (req,res,next)=>{
  try {
    const {id} = req.params
    const {Acc_HolderName,Acc_Number,IFSC_Code} = req.body
    console.log(id);
    console.log(Acc_HolderName);

    const rider = await Rider.findById({_id: id})

    if (rider) {
      
      rider.BankDetails = {
        Acc_HolderName,
        Acc_Number,
        IFSC_Code
      };

    await rider.save()

      console.log('sssssssssss');
      res.json({rider})
    }else{
      console.log('eeeeeeeeee');
      res.status(500)
      throw new Error("Server")

    }

  } catch (error) {
    console.log(error);
    next(error)
  }
}

const editRiderProfile = async (req,res,next)=>{
  try {
    const RiderId = req.params.id;
    console.log(RiderId);
    const {username , email, phone} = req.body
    

    const rider = await Rider.findByIdAndUpdate(
      RiderId,
      {
       username,
       email,
       phone
      },
      { new: true }  
    );

    if (rider) {
      console.log('sssssssssssssss');
      res.status(200).json({ riderData:rider});
    } else {
      console.log('eeeeeeeeeeeeeeee');
      res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const availableOrders = async (req,res,next)=>{
  try {
    const orders = await Order.find({status:'Pending'}).populate('items.product').populate('items.hotelId').populate('userId')

    if (orders) {
      res.json({success:true,orders})
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const takeOrder = async (req,res,next)=>{
  try {
    const {id}= req.params
    const {orderId} = req.body

    

    const rider = await Rider.findOne({_id:id})

    if (!rider) {
      throw new Error("Rider not found")
    }

    const order = await Order.findByIdAndUpdate(orderId,{
      riderDetails:rider._id,
      status:"onDelivery",
    },{new:true})

    if (order) {
      res.status(201).json({success:true,message:"Order taken"})
    }

    


  } catch (error) {
    console.log(error)
    next(error)
  }
}

// cuurent order

const currentOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const riderOrder = await Order.find({
      status: 'onDelivery',
      'riderDetails': new mongoose.Types.ObjectId(id) // Convert id to ObjectId
    }).populate('riderDetails');

    

    if (riderOrder.length > 0) {
      res.status(201).json({ message: "Success", order: riderOrder, success: true });
    } else {
      throw new Error("No onDelivery orders for the specified rider");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};




export {riderRegister, riderLogin, riderVehicleDetails, riderBankDetails, editRiderProfile,
  availableOrders, takeOrder, currentOrder 
  
}