import express from 'express';
import axios from 'axios';

const router = express.Router();

const apiKey = '3f185b187014467da138a8f54e030760'; // Replace with your actual API key

// Define the API route for property search
router.get('/propertysearch', async (req, res) => {
  try {
    // Extract query parameters from the request
    const {
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      radius,
      propertyType,
      bedrooms,
      bathrooms,
      limit,
      offset,
    } = req.query;

    // Construct the Rentcast API URL with query parameters
    const rentcastApiUrl = 'https://api.rentcast.io/v1/property-records';
    const queryParams = {
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      radius,
      propertyType,
      bedrooms,
      bathrooms,
      limit,
      offset,
    };

    // Make a GET request to the Rentcast API with the proper headers
    const response = await axios.get(rentcastApiUrl, {
      params: queryParams,
      headers: {
        // 'X-Api-Key': `${apiKey}`,
        'X-Api-Key':'3f185b187014467da138a8f54e030760', 
        'accept': 'application/json',
        
      },
    });

    // Send the response from the Rentcast API to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
export { router as propertyRouter };
