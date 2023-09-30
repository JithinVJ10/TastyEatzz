import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'

// generate jwt
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_Secret,{expiresIn:'30d'})
}

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
      console.log('sssssssssssssss');
      res.status(200).json({ message:"Successfully Updated", 
        userData:{_id: user._id,username,email,phone}
     });
    } else {
      console.log('eeeeeeeeeeeeeeee');
      res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}



export {userRegister, userLogin, googleSignup, googleLogin, UpdateUserDetials}