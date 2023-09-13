import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function PropertySearchForm() {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Add other Rentcast API query parameters here
  });

  useEffect(() => {
    // Define a function to fetch properties based on search parameters
    const fetchProperties = async () => {
      try {
        // Construct the API URL with query parameters
        const apiUrl = `https://api.rentcast.io/v1/properties?address=${searchParams.address}&city=${searchParams.city}&state=${searchParams.state}&zipCode=${searchParams.zipCode}&latitude=${searchParams.latitude}&longitude=${searchParams.longitude}&radius=${searchParams.radius}&propertyType=${searchParams.propertyType}&bedrooms=${searchParams.bedrooms}&bathrooms=${searchParams.bathrooms}&limit=${searchParams.limit}&offset=${searchParams.offset}`;
        const response = await axios.get(apiUrl);

        // Set the properties in the state based on the API response
        setProperties(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Call the fetchProperties function when the component mounts
    fetchProperties();
  }, [searchParams]);

  // Handle changes in the search form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Rentcast Property Search</h1>
      <form>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          value={searchParams.address}
          onChange={handleInputChange}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={searchParams.city}
          onChange={handleInputChange}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          name="state"
          value={searchParams.state}
          onChange={handleInputChange}
        />

        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          value={searchParams.zipCode}
          onChange={handleInputChange}
        />

        {/* Add other input fields for search parameters */}
        
        <button type="submit">Search</button>
      </form>

      <ul>
        {properties.map((property) => (
          <li key={property.propertyId}>
            <div>
              <h2>{property.address}</h2>
              {/* Add other property details here */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
