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
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  radius: {
    type: Number,
    required: false,
  },
  propertyType: {
    type: String,
  },
  bedrooms: {
    type: Number,
    required: false,
  },
  bathrooms: {
    type: Number,
    required: false,
  },
});

export const Property = mongoose.model('Property', propertySchema);

