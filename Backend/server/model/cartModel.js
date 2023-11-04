import mongoose from 'mongoose'

const cartScheme = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    products:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Foods",
            require:true
        },
        quantity:{
            type: Number,
            required: true,
            default: 1,
        }
    }],
    total: {
        type: Number,
    },
    discount: {
        type: Number,
  
    },
    wallet:{
        type:Number
    }
},{timestamps:true})

const Cart = mongoose.model("cart",cartScheme)

export default Cart