import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv'; 

dotenv.config();

const router = express.Router();

const apiKey = process.env.API_KEY  

router.get('/propertyrecords', async (req, res) => {
  try {
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

    const response = await axios.get(rentcastApiUrl, {
      params: queryParams,
      headers: {
        'X-Api-Key': apiKey, 
        'accept': 'application/json',
      },
    });
console.log(response)
    res.json(response.data);
  } catch (error) {
    if(axios.isAxiosError(error)){
        console.error(error.message);
    }
   
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// -------------------------------------------------------------------------------------------------

router.get('/listings', async (req, res) => {
  try {
    const {
      
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

    const rentcastApiUrl = 'https://api.rentcast.io/v1/listings/sale';
    const queryParams = {
      
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

    const response = await axios.get(rentcastApiUrl, {
      params: queryParams,
      headers: {
        'X-Api-Key': apiKey, 
        'accept': 'application/json',
      },
    });
console.log(response)
    res.json(response.data);
  } catch (error) {
    if(axios.isAxiosError(error)){
        console.error(error.message);
    }
   
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
export { router as propertyRouter };
