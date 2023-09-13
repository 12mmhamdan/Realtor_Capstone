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

  const handleSubmit = ((e) => {
    e.preventDefault()
    // Define a function to fetch properties based on search parameters
    const fetchProperties = async () => {
      try {
        // Construct the API URL with query parameters
        // const apiUrl = `http://localhost:3001/Property/propertysearch`;
        // const response = await axios.get(apiUrl, {params:searchParams});
        

        // // Set the properties in the state based on the API response
        // setProperties(response.data);
        // console.log(response.data);
        const fakeProperties =[
          {
            "addressLine1": "19430 Lisadell Dr",
            "city": "Tinley Park",
            "state": "IL",
            "zipCode": "60487",
            "county": "Will",
            "bedrooms": 3,
            "bathrooms": 3,
            "squareFootage": 2687,
            "propertyType": "Single Family",
            "formattedAddress": "19430 Lisadell Dr, Tinley Park, IL 60487",
            "assessorID": "19-09-11-103-028",
            "legalDescription": "IN BROOKSIDE GLEN PUD UNIT 5, BEING A SUB IN SEC. 11 T35N-R12E.",
            "ownerOccupied": true,
            "subdivision": "BROOKSIDE GLEN",
            "yearBuilt": 2001,
            "lastSalePrice": 353100,
            "lastSaleDate": "2017-06-01T00:00:00.000Z",
            "features": {
                "architectureType": "Ranch",
                "cooling": true,
                "exteriorType": "Brick",
                "fireplace": true,
                "floorCount": 1,
                "garage": true,
                "garageSpaces": 2,
                "garageType": "Attached Garage",
                "heating": true,
                "heatingType": "Central",
                "roofType": "Composition Shingle",
                "roomCount": 8,
                "unitCount": 1
            },
            "taxAssessments": {
                "2018": {
                    "value": 119362,
                    "land": 23106,
                    "improvements": 96256
                }
            },
            "propertyTaxes": {
                "2018": {
                    "total": 11112
                }
            },
            "owner": {
                "names": [
                    "BENJAMIN M ZINTAK"
                ],
                "mailingAddress": {
                    "id": "19430-Lisadell-Dr,-Tinley-Park,-IL-60487",
                    "addressLine1": "19430 Lisadell Dr",
                    "city": "Tinley Park",
                    "state": "IL",
                    "zipCode": "60487"
                }
            },
            "id": "19430-Lisadell-Dr,-Tinley-Park,-IL-60487",
            "longitude": -87.82383,
            "latitude": 41.537142
        },
        {
            "addressLine1": "16156 Creekmont Ct",
            "city": "Tinley Park",
            "state": "IL",
            "zipCode": "60487",
            "bedrooms": 2,
            "bathrooms": 1.5,
            "propertyType": "Condo",
            "county": "Cook County",
            "formattedAddress": "16156 Creekmont Ct, Tinley Park, IL 60487",
            "assessorID": "27-23-104-026-1024",
            "ownerOccupied": true,
            "subdivision": "WESTBERRY VILLAGE WEST CONDO",
            "yearBuilt": 1966,
            "lotSize": 205603,
            "lastSalePrice": 138500,
            "lastSaleDate": "2001-12-06T00:00:00.000Z",
            "features": {
                "architectureType": "Condo / Apartment",
                "exteriorType": "Frame / Masonry",
                "fireplace": true,
                "garage": true,
                "roofType": "Asphalt",
                "unitCount": 1
            },
            "owner": {
                "names": [
                    "RAMON F GUERRA"
                ],
                "mailingAddress": {
                    "id": "PO-BOX-2561,-Orland-Park,-IL-60462",
                    "addressLine1": "PO BOX 2561",
                    "city": "Orland Park",
                    "state": "IL",
                    "zipCode": "60462"
                }
            },
            "squareFootage": 1260,
            "taxAssessments": {
                "2018": {
                    "value": 12001,
                    "land": 1752,
                    "improvements": 10249
                }
            },
            "propertyTaxes": {
                "2018": {
                    "total": 2719
                }
            },
            "id": "16156-Creekmont-Ct,-Tinley-Park,-IL-60487",
            "longitude": -87.828866,
            "latitude": 41.597299
        },
        {
            "addressLine1": "9452 Quail Trl",
            "city": "Tinley Park",
            "state": "IL",
            "zipCode": "60487",
            "bedrooms": 2,
            "bathrooms": 1.5,
            "squareFootage": 1589,
            "propertyType": "Townhouse",
            "county": "Cook",
            "formattedAddress": "9452 Quail Trl, Tinley Park, IL 60487",
            "id": "9452-Quail-Trl,-Tinley-Park,-IL-60487",
            "longitude": -87.848661,
            "latitude": 41.571972
        },
        {
            "bathrooms": 3,
            "bedrooms": 4,
            "squareFootage": 3418,
            "county": "Cook",
            "propertyType": "Single Family",
            "addressLine1": "19517 Southfield Ln",
            "city": "Tinley Park",
            "state": "IL",
            "zipCode": "60487",
            "formattedAddress": "19517 Southfield Ln, Tinley Park, IL 60487",
            "assessorID": "19-09-12-311-011",
            "legalDescription": "IN BROOKSIDE GLEN PUD UNIT 6, BEING A SUB IN THE NW1/4 AND THE SW1/4 OF SEC 12, T35N-R12E.",
            "ownerOccupied": true,
            "subdivision": "BROOKSIDE GLEN",
            "yearBuilt": 2003,
            "lastSalePrice": 331110,
            "lastSaleDate": "2015-10-08T00:00:00.000Z",
            "features": {
                "cooling": true,
                "exteriorType": "Brick",
                "fireplace": true,
                "floorCount": 2,
                "garage": true,
                "garageSpaces": 2,
                "garageType": "Attached Garage",
                "heating": true,
                "heatingType": "Central",
                "roofType": "Composition Shingle",
                "roomCount": 10,
                "unitCount": 1
            },
            "taxAssessments": {
                "2018": {
                    "value": 124411,
                    "land": 21838,
                    "improvements": 102573
                }
            },
            "propertyTaxes": {
                "2018": {
                    "total": 11607
                }
            },
            "owner": {
                "names": [
                    "TORIE T SUTTON"
                ],
                "mailingAddress": {
                    "id": "19517-Southfield-Ln,-Tinley-Park,-IL-60487",
                    "addressLine1": "19517 Southfield Ln",
                    "city": "Tinley Park",
                    "state": "IL",
                    "zipCode": "60487"
                }
            },
            "id": "19517-Southfield-Ln,-Tinley-Park,-IL-60487",
            "longitude": -87.810027,
            "latitude": 41.53506
        },
        {
            "bathrooms": 2,
            "bedrooms": 2,
            "squareFootage": 1600,
            "county": "Will",
            "propertyType": "Condo",
            "addressLine1": "7935 Trinity Cir",
            "addressLine2": "Unit 4NE",
            "city": "Tinley Park",
            "state": "IL",
            "zipCode": "60487",
            "formattedAddress": "7935 Trinity Cir, Unit 4NE, Tinley Park, IL 60487",
            "id": "7935-Trinity-Cir,-Unit-4NE,-Tinley-Park,-IL-60487",
            "longitude": -87.810146,
            "latitude": 41.540209
        },
        ]
        setProperties(fakeProperties)
      } catch (err) {
        console.error(err);
      }
    };

    // Call the fetchProperties function when the component mounts
    fetchProperties();
  });

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
      <h1>Property Search</h1>
      <form onSubmit={handleSubmit}>
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
              <h2>{property.city}</h2>
              <h2>{property.state}</h2>
              <h2>{property.zipCode}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
