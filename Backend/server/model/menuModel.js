import mongoose from "mongoose";

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

// Define the CuisineType schema
const cuisineTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create the CuisineType model
const CuisineType = mongoose.model('CuisineType', cuisineTypeSchema);

// Export the Category and CuisineType models
export { Category, CuisineType };
