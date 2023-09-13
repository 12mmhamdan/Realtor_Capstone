import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config();

const router = express.Router();

const apiKey = process.env.API_KEY  // Replace with your actual API key

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
    const rentcastApiUrl = 'https://api.rentcast.io/v1/properties';
    const queryParams = {
    //   address,
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
    console.log(queryParams)

    // Make a GET request to the Rentcast API with the proper headers
    const response = await axios.get(rentcastApiUrl, {
      params: queryParams,
      headers: {
        'X-Api-Key': apiKey, // Use the API key from the configuration
        'accept': 'application/json',
      },
    });
console.log(response)
    // Send the response from the Rentcast API to the client
    res.json(response.data);
  } catch (error) {
    if(axios.isAxiosError(error)){
        console.error(error.message);
    }
    // Handle any errors that occur during the API request
   
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
export { router as propertyRouter };
