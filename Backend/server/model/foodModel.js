import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    cuisineType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CuisineType',
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true, // true means available, false means out of stock
    },
    availableFrom: {
        type: Date,
    },
    availableTo: {
        type: Date,
    },
}, { timestamps: true });

const Food = mongoose.model("Foods", foodSchema);

export default Food;
