import mongoose from "mongoose";

const foodScheme = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        require:true
    },
    photo:{
        type:String,
        
    },
    isAvailable:{
        type: Boolean,
    },
    availableFrom:{
        type:Date
    },
    availableTo:{
        type:Date
    },
},{timestamps: true})

const Food = mongoose.model("Foods",foodScheme)

export default Food