import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const HotelSchema = new mongoose.Schema(
    {
      hotelName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
    
      },
      isBlocked: {
        type: Boolean,
      },
      photo:[ {
        type: String,
      }],
      GSTNumber:{
        type: Number,
      },

      Founded:{
        type:Date
      }
    },
    
    {
      timestamps: true,
    }
  );
  
  // Match Rider entered password to hashed password in database
  HotelSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  HotelSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  const Hotel = mongoose.model('Hotel', HotelSchema);

  export default Hotel