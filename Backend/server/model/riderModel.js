import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const RiderSchema = new mongoose.Schema(
    {
      username: {
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
      isBlocked: {
        type: Boolean,
      },
      photo:[ {
        type: String,
      }],
      VehicleDetails:{
        VehicleModel:String,
        VehicleNo:String,
        RcNumber:String,
        LicenseId:String
      },
      BankDetails:{
        Acc_HolderName: String,
        Acc_Number : String,
        IFSC_Code : String,
      }
    },
    
    {
      timestamps: true,
    }
  );
  
  // Match Rider entered password to hashed password in database
  RiderSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Encrypt password using bcrypt
  RiderSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  const Rider = mongoose.model('Rider', RiderSchema);

  export default Rider