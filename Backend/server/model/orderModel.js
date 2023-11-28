import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Foods",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true 
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  riderDetails:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider",
    
  },
  status: {
    type: String,
    enum: ['Pending','onDelivery', 'Delivered'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  pickUpAddress: [{
    type: Object,
    required: true,
  }],
  DeliveryAddress: {
    type: Object,
    required: true,
  },
  
});

const Order = mongoose.model('orders', orderSchema);

export default Order