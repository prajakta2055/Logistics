import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Navbar from './Manager';
import Manager from './Navbar';
import { useUser } from './userContext';
const DataAnalytics = () => {
  const [formValues, setFormValues] = useState({
    serviceProviderName: 'ALL_PRODUCTS',
    reviewRating: '1',
    compareRating: 'GREATER_THAN',
    retailerZipcode: '',
  });

  const [filteredData, setFilteredData] = useState([]);
  const { user } = useUser();
  const { username, usertype } = user;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formValues to the backend to fetch filtered data
      const response = await fetch(`http://localhost:8080/dataAnalytics?${new URLSearchParams(formValues)}`);
      const data = await response.json();
      console.log(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
    {usertype === 'customer'?<Manager tab={'DataAnalystics'} />:<Navbar tab={'DataAnalystics'} />}
     
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form fields */}
        <label>
          Service Provider Name:
          <select
            name="serviceProviderName"
            value={formValues.serviceProviderName}
            onChange={handleInputChange}
          >
            <option value="ALL_PRODUCTS">All Services</option>
            <option value="USPS">USPS</option>
            <option value="UPS">UPS</option>
            <option value="FedEx">FedEx</option>
            <option value="DHL">DHL</option>
            <option value="CDL">CDL</option>
            {/* Add other service provider options */}
          </select>
        </label>
        {usertype === 'admin'?(  
          <>
        <label>
          Review Rating:
          <select
            name="reviewRating"
            value={formValues.reviewRating}
            onChange={handleInputChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            {/* Add other rating options */}
          </select>
        </label>

        <label>
          Compare Rating:
          <select
            name="compareRating"
            value={formValues.compareRating}
            onChange={handleInputChange}
          >
          <option value="GREATER_THAN">Greater Than</option>
            <option value="LESS_THAN">Less Than</option>
            <option value="EQUALS_TO">Equals</option> 
            {/* Add other comparison options */}
          </select>
        </label>

        <label>
          Retailer Zip Code:
          <input
            type="text"
            name="retailerZipcode"
            value={formValues.retailerZipcode}
            onChange={handleInputChange}
          />
        </label>
        </>):(<></>)
        }

        <button type="submit">Find Reviews</button>
      </form>

      {/* Display filtered data */}
      <div>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Service Provider</Th>
              <Th>Rating</Th>
              <Th>Feedback</Th>
              {usertype === 'admin'?(<>
              <Th>Order ID</Th>
              <Th>Date of Service</Th>
              <Th>Recommend Service</Th>
              </>):(<></>)}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item) => (
              <Tr key={item._id}>
                <Td>{item.username}</Td>
                <Td>{item.serviceProviderName}</Td>
                <Td>{item.serviceProviderRating}</Td>
                <Td>{item.feedback}</Td>
                {usertype === 'admin'?(<>
                <Td>{item.orderID}</Td>
                <Td>{item.dateOfService}</Td>
                <Td>{item.recommendService}</Td>
                </>):(<></>)}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
            </div>
            </div>
  );
};

export default DataAnalytics;
