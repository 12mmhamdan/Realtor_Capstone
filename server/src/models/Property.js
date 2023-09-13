// Import the necessary modules
const mongoose = require('mongoose');

// Define the Property schema
const propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: String,
    // Define allowed property types or an enum if needed
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  // Add other property details as needed
});

// Create a Property model from the schema
const Property = mongoose.model('Property', propertySchema);

// Export the Property model
module.exports = Property;