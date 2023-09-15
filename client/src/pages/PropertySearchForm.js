import React, { useState } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space, Alert } from 'antd';


export function PropertySearchForm() {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useState({
    city: "",
    state: "",
    zipCode: "",
    
    // Add other Rentcast API query parameters here
  });

  const [noResults, setNoResults] = useState(false);


  const columns = [
    {
      title: 'Address',
      dataIndex: 'addressLine1',
      key: 'addressLine1',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Zip Code',
      dataIndex: 'zipCode',
      key: 'zipCode',
    },
    {
      title: 'Last Sale Price',
      dataIndex: "lastSalePrice",
      key: "lastSalePrice"
    },
    {
      title: 'Bedroom(s)',
      dataIndex: "bedrooms",
      key: "bedrooms"
    },
    {
      title: 'Bathroom(s)',
      dataIndex: "bathrooms",
      key: "bathrooms"
    }
  ];


  const fetchProperties = async () => {
  //   try {
  //     // Construct the API URL with query parameters
  //     const apiUrl = `http://localhost:3001/Property/propertyrecords`;
  //     const response = await axios.get(apiUrl, { params: searchParams });

  //      // Filter the fake properties based on search criteria
  //      const filteredProperties = response.data.filter((property) => {
  //       const cityMatches = property.city.toLowerCase() === searchParams.city.toLowerCase();
  //       const stateMatches = property.state.toLowerCase() === searchParams.state.toLowerCase();
  //       const zipCodeMatches = property.zipCode === searchParams.zipCode;

  //       return cityMatches && stateMatches && zipCodeMatches;
  //     });

  //     // If no properties are found, set the noResults state to true
  //     if (filteredProperties.length === 0) {
  //       setNoResults(true);
  //     } else {
  //       setNoResults(false);
  //     }
     
     
  //     setProperties(response.data);
  //     console.log('Properties after setting:', response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
//----------------------------------------------------------------------------------------------------------------------------------------------------

      // For testing purposes, use fakeProperties
      try{
      const fakeProperties = [
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
      ];

       // Filter the fake properties based on search criteria
       const filteredProperties = fakeProperties.filter((property) => {
        const cityMatches = property.city.toLowerCase() === searchParams.city.toLowerCase();
        const stateMatches = property.state.toLowerCase() === searchParams.state.toLowerCase();
        const zipCodeMatches = property.zipCode === searchParams.zipCode;

        return cityMatches && stateMatches && zipCodeMatches;
      });

      // If no properties are found, set the noResults state to true
      if (filteredProperties.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
     
     
      setProperties(fakeProperties);
      console.log('Properties after setting:', fakeProperties);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmptySearch = Object.values(searchParams).some((value) => value === '');

    if (!isEmptySearch) {
      // If search criteria are not empty, then fetch the data
      fetchProperties();
    } else {
      // Display a message or take appropriate action when search criteria are empty
      console.log('Please enter search criteria');
    }
  };

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
      <h1>Property Record Search by Area</h1>
      <form onSubmit={handleSubmit}>
        <Space>
          
          <Input
            placeholder="City"
            name="city"
            value={searchParams.city}
            onChange={handleInputChange}
          />
          <Input
            placeholder="State"
            name="state"
            value={searchParams.state}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Zip Code"
            name="zipCode"
            value={searchParams.zipCode}
            onChange={handleInputChange}
          />
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Space>
      </form>

      {noResults ? (
        <Alert message="No properties found for the entered criteria" type="warning" />
      ) : (
        <Table
          dataSource={properties}
          columns={columns}
          rowKey={(record) => record.id} // Assuming 'id' is a unique identifier in your data
        />
      )}
    </div>
  );
}