import User from "../model/userModel.js";
import Food from '../model/foodModel.js'
import Cart from "../model/cartModel.js";
import jwt from 'jsonwebtoken'
import generateToken from "../utils/generateToken.js";

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



export {
  userRegister, userLogin, googleSignup, googleLogin, UpdateUserDetials,
  getSingleProduct,addTocart,getCart, quantityIncrease, quantityDecrease
}