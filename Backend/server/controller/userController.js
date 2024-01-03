import User from "../model/userModel.js";
import Food from '../model/foodModel.js'
import Cart from "../model/cartModel.js";
import jwt from 'jsonwebtoken'
import generateToken from "../utils/generateToken.js";
import Hotel from "../model/hotelModel.js";
import Order from "../model/orderModel.js";
import Rider from '../model/riderModel.js'
import { Category } from "../model/menuModel.js";

// user register /admin/userRegister
const userRegister = async (req,res,next)=>{
    try {
        const { username, email, phone, password } = req.body;
        console.log(username, email, phone, password);
    
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          const error = new Error('User already exists');
          error.statusCode = 409; // You can set a custom status code if needed

          throw error; // Throw the error

        }
    
        const user = await User.create({
          username,
          email,
          phone,
          password,
        });
    
        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.username,
            email: user.email,
            phone: user.phone,
            message : 'Account created successfully'
          });
        } else {
          res.status(400);
          throw new Error('Invalid User data');
        }
      } catch (error) {
        next(error); // Pass the error to the error handler middleware
      }

}

// user login /admin/userLogin
const userLogin = async (req,res,next)=>{
    try {
        const {email, password} = req.body
        console.log(email);
        
        const user = await User.findOne({email})

        if (user.isBlocked) {
          res.status(400)
          throw new Error("User Blocked")
        }

        if (user && (await user.matchPassword(password))) {
          const token = generateToken(user._id)
          res.json({
            token,
            userData:{
              _id : user._id,
              username: user.username,
              email: user.email,
              phone: user.phone,
            },
            
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

// check user Blocked or not 
const getLoggedInUser = async (req,res,next)=>{
  try {
    const {id} = req.params

    const userData = await User.findOne({_id:id})

    if (userData) {
      res.status(201).json({userData,message:'successfully fetched'})
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// google Sign up
const googleSignup = async (req, res , next) => {
  try {
      const token = req.body.credential;
      console.log('Hellooooo');
      const decodedData = jwt.decode(token);

      const {name , email , picture , jti} = decodedData;

      const newUser = new User({
           username:name, email , photo : picture , password : jti  ,
      });

      if (newUser) {
        await newUser.save();
        res.status(201).json({message: 'user saved succesfully'});
        console.log('done');
      }else{
        res.status(400)
        throw new Error("Invaild Email or password")
      }
      

  } catch (error) {
      next(error);
      console.log(error);
  }
}

const googleLogin = async (req, res , next) => {
  try {
      const token = req.body.credential;

      const decodedData = jwt.decode(token);

      const {name , email , picture} = decodedData;

      const user = await User.findOne({email : email});

      if(user){

          if (user.isBlocked) {
              return res.status(401).json({ error: 'Account is blocked' });
          }

          let token = jwt.sign({userId : user.id , email : user.email} , process.env.JWT_SECRET, {expiresIn: '30d'});
          res.status(200).json({message : 'Login Successfull' ,  token, 
              userData : {
                  username : user.username , useremail : user.email,
                  userId : user._id,
                  photo : picture
              }});

      } else {
          res.status(401).json({error : 'User not found'});
      }
  } catch (error) {
      next(error);
  }
}

//Update User Detials

const UpdateUserDetials = async (req,res,next)=>{
  try {
    const UserId = req.params.id;
    console.log(UserId);
    const {username , email, phone} = req.body
    

    const user = await User.findByIdAndUpdate(
      UserId,
      {
       username,
       email,
       phone
      }   
    );

    if (user) {
      res.status(200).json({ message:"Successfully Updated", 
        userData:{_id: user._id,username,email,phone}
     });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// add adddress

const addUserAddress = async (req,res, next)=>{
  try {
    const {id} = req.params
    const {addressData} = req.body

    const user = await User.findOne({_id:id})

    if (user) {
      user.address.push({
        name:addressData.name,
        address:addressData.address,
        mobile:addressData.mobile,
        city:addressData.city,
        pincode:addressData.pincode,
        state:addressData.state,
      })

      await user.save()

      res.status(200).json({success:true,message:"Successfully added address"})
    }else{
      res.status(400)
        throw new Error("User not found")
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
}

// get address
const getAddress = async(req,res,next)=>{
  try {
    const {id} = req.params

    const user = await User.findOne({_id:id})

    if(user){
      let userAddress = user.address

      res.status(201).json({success:true,message:"Successfully fetched address", userAddress})
    }else{
      res.status(400)
      throw new Error("User not found")
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
}

//Update address

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { addressData } = req.body;
    console.log("ID:", addressData.addressId);

    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    // Use findIndex to get the index of the address in the array
    const addressIndex = user.address.findIndex((addr) => String(addr._id) === String(addressData.addressId));

    if (addressIndex !== -1) {
      // Update the address using the index
      user.address[addressIndex].name = addressData.name;
      user.address[addressIndex].address = addressData.address;
      user.address[addressIndex].mobile = addressData.mobile;
      user.address[addressIndex].city = addressData.city;
      user.address[addressIndex].pincode = addressData.pincode;
      user.address[addressIndex].state = addressData.state;

      await user.save(); // Save the updated user document

      res.status(201).json({ success: true, message: 'Successfully Updated' });
    } else {
      res.status(400);
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error(error);
    next(error); 
  }
};

// getSelectedAddress

const getSelectedAddress = async (req,res,next)=>{
  try {
    const {id} = req.params
    
    const user = await User.findOne(
      { _id: id }
    )
    

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    let userAddress = user.address
    res.status(201).json({success:true,message:"Sucessfully Fetched",userAddress})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


// get Single product

const getSingleProduct = async (req,res,next)=>{
  try {
    const {id} = req.params

    const product = await Food.findById(id).populate('hotelName').populate('cuisineType').populate('category')
    if (product) {
      res.status(201).json({message:'Sucessfully fetch food',product})
    }else{
      console.log('food not found');
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// Add To cart

const addTocart = async (req,res,next)=>{
  try {
    const productId = req.params.id
    const {userCred ,quantity} = req.body
    const userId = userCred._id

    let userCart = await Cart.findOne({userId:userId})

    if (!userCart) {
      const newCart = new Cart({
        userId:userId, products:[]
      })
      await newCart.save()
      userCart = newCart
    }

    const productIndex = userCart.products.findIndex(
      (product) => product.productId == productId

    );

    if (productIndex === -1) {
      // If the product is not in the cart, add it
      userCart.products.push({ productId, quantity :quantity });

  }else {
    userCart.products[productIndex].quantity +=quantity
  }


  await userCart.save();

  res.status(201).json({ message: 'food added to cart successfully', success :true });

  } catch (error) {
    console.log(error);
    next(error)
  }
}

// get Category

const getCategory = async (req,res,next)=>{
  try {
    const category = await Category.find()

    if (category) {
      res.status(200).json({success:true,message:"successfully fatched",category})
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// Get User Cart 

const getCart = async (req,res,next)=>{
  try {
    const userId = req.params.id

    const userCart = await Cart.findOne({userId:userId}).populate('products.productId').populate('products.quantity').populate('products.productId.hotelName')

    if (userCart) {
      res.status(201).json({message:"successsfully fetched", userCart})
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// quantityIncrease

const quantityIncrease = async (req,res,next)=>{
  try {
    const {foodId, userId} = req.body

    const cart = await Cart.findOne({userId: userId}).populate("products.productId")

    let cartIndex = cart.products.findIndex(items=> items.productId.equals(foodId))

    cart.products[cartIndex].quantity +=1

    await cart.save()

    res.status(201).json({
      success:true,
      message:"Quantity updated",
  })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const quantityDecrease = async (req,res,next)=>{
  try {
    const {foodId, userId} = req.body

    const cart = await Cart.findOne({userId: userId}).populate("products.productId")

    let cartIndex = cart.products.findIndex(items=> items.productId.equals(foodId))

    cart.products[cartIndex].quantity -=1

    await cart.save()

    res.status(201).json({
      success:true,
      message:"Quantity updated",
  })
    
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// remove item in the cart

const deleteCartItem = async(req,res,next)=>{
  try {
    const {foodId, userId} = req.body

    console.log(foodId,"ss",userId)
    const itemDeleted = await Cart.findOneAndUpdate(
      {userId: userId},
      {$pull:{ products:{productId: foodId}}},
      {new: true}
    )
      console.log(itemDeleted)
    if(itemDeleted){
      console.log("gsgsgsg")
      res.status(201).json({
        success:true,
        message:"Removed item",
      })
    }else{
        res.json({
          success:false,
          message:"failed to Remove item",
        })
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
}

// place order

const placeOrder = async(req,res,next)=>{
  try {
    const {userId,cartItems,address,subTotal,selectedPayment} = req.body

    console.log(selectedPayment)
    console.log("Helloo",cartItems.products[0].productId.hotelName)

    const items = cartItems.products.map(item =>{
      const product = item.productId;
      const quantity = item.quantity;
      const price = product.price;
      const hotelId = product.hotelName

      if (!price) {
        throw new Error("Product price is required");
      }
      if (!product) {
        throw new Error("Product is required");
      }

      return {
        product: product._id,
        quantity: quantity,
        price: price,
        hotelId: hotelId,
      }
      
    })
    

    const hotelIds = items.map((item) => item.hotelId);

    // Assuming 'Hotel' is your mongoose model
    const hotels = await Hotel.find({ _id: { $in: hotelIds } });
    if (!hotels) {
      throw new Error("hotels not found");
    }
    const hotelAddresses = hotels.map((hotel) => hotel.address);

    if (selectedPayment === "cashondelivery") {
      const order = new Order({
        userId:userId,
        items:items,
        total:subTotal,
        status:"Pending",
        paymentMethod:selectedPayment,
        pickUpAddress:hotelAddresses,
        DeliveryAddress:address,
      })

      await order.save()
    }else{
      return res.json({success:false,message:"This option unavailable now"})
    }
    
    const cart = await Cart.deleteOne({userId:userId})
    res.status(201).json({success:true,message:"Successfully placed"})

  } catch (error) {
    console.log(error)
    next(error)
  }

}

const getOrders = async (req,res,next)=>{
  try {
    const {id} = req.params

    const orders = await Order.find({userId:id}).populate('items.product').populate('items.hotelId').populate('riderDetails')

    // console.log(orders.items[0].hotelId.hotelName)

    const orderDetails = orders.map((order) => {
      return {
        _id: order._id,
        userId:order.userId,
        items:order.items,
        total:order.total,
        riderDetails:order.riderDetails,
        status:order.status,
        paymentMethod:order.paymentMethod,
        pickUpAddress:order.pickUpAddress,
        DeliveryAddress:order.DeliveryAddress,
      };
    });

    res.status(201).json({success:true,orderDetails})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


const getSingleOrder = async (req,res,next)=>{
  try {
    const {id}= req.params

    const order = await Order.findOne({_id:id})

    if (order) {
      res.status(201).json({success: true,message:'succesfully fetched', order})
    }


  } catch (error) {
    console.log(error)
    next(error)
  }
}



export {
  userRegister, userLogin, googleSignup, googleLogin, UpdateUserDetials,
  getSingleProduct,addTocart,getCart, quantityIncrease, quantityDecrease,
  getLoggedInUser, addUserAddress, getAddress, updateAddress, getSelectedAddress,
  placeOrder, deleteCartItem, getCategory, getOrders, getSingleOrder
}