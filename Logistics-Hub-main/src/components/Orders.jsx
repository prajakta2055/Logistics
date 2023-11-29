/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    Select,
    MenuItem,
    TableContainer,
  } from '@chakra-ui/react';
import Navbar from './Manager';
import axios from 'axios';

function Orders() {
  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [customer, setCustomer] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [packageDimensions, setPackageDimensions] = useState('');
  const [carrierLogo, setCarrierLogo] = useState('');
  const [carrierName, setCarrierName] = useState('');
  const [price, setPrice] = useState('');
  const [dateOrdered, setDateOrdered] = useState('');
  const [destination, setDestination] = useState('');
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://localhost:8081/orderdata')
      .then((response) => {
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        setSampleData(response.data.data);
        if (response.data.message === 'Data retrieved successfully') {
        } else {
          // setError('Error fetching data: ' + response.data.error);
        }
      })
      .catch((err) => {
        // setError('Error fetching data: ' + err.message);
      });
  }, [sampleData]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showMapPopup, setShowMapPopup] = useState(false);

  
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAddToTableClick = () => {
    const logo =
      carrierName === 'UPS'
        ? 'ups.svg'
        : carrierName === 'USPS'
        ? 'usps.svg'
        : carrierName === 'FedEx'
        ? 'fedex.svg'
        : carrierName === 'CDL'
        ? 'cdl.svg'
        : 'dhl.svg';
    axios
      .post('http://localhost:8081/order', {
        customer,
        itemName,
        itemWeight,
        packageDimensions,
        carrierName,
        dateOrdered,
        destination,
        logo,
        price,
      })
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);

        if (res.data === 'Error') {
          console.error('Login failed. Server returned an error:', res.data);
        } else {
          // Process the successful response data
          setSampleData([
            ...sampleData,
            [customer, itemName, itemWeight, packageDimensions, carrierName, dateOrdered, destination, logo, price],
          ]);
          alert('Order placed successfully!');
          setShowPopup(false);
        }
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTrackButtonClick = (orderId, customer, itemName, itemWeight, packageDimensions, carrierName) => {
    setCurrentOrder({ orderId, customer, itemName, itemWeight, packageDimensions, carrierName });
    setShowMapPopup(true);
  };

  const handleMapPopupClose = () => {
    setCurrentOrder(null);
    setShowMapPopup(false);
  };

  const trackButton = () => {
    return (
      <Button onClick={() => handleTrackButtonClick(orderId, customer, itemName, itemWeight, packageDimensions, carrierName)}>
        Track
      </Button>
    );
  };

  const filteredData = sampleData.filter((data) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return searchRegex.test(data.orderId) || searchRegex.test(data.customer) || searchRegex.test(data.itemName) || searchRegex.test(data.carrierName);
  });

  return (
    <div style={{ width: '100%' }}>
      <Navbar tab={'orders'} />
      <div className="main-body">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h4>Customer Orders</h4>
          <Input label="Search" value={searchTerm} placeholder='Search here about order details' onChange={handleSearchTermChange} style={{ marginBottom: '16px' }} />
          {filteredData.length > 0 && (
            <TableContainer>
              <Table variant="simple">
                
                <Thead>
                  <Tr>
                    <Th>OrderId</Th>
                    <Th>Date Ordered</Th>
                    <Th>Customer</Th>
                    <Th>Item</Th>
                    <Th>Package</Th>
                    <Th>Carrier</Th>
                    <Th>Price</Th>
                    <Th>Destination</Th>
                    <Th>Track</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map((data) => (
                    <Tr key={data.orderId}>
                      <Td>{data.orderId}</Td>
                      <Td>{data.dateOrdered}</Td>
                      <Td>{data.customer}</Td>
                      <Td>{`${data.itemName} (${data.itemWeight})`}</Td>
                      <Td>{data.packageDimensions}</Td>
                      <Td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {<img src={data.logo} style={{ width: '30px' }} alt={`${data.carrierName} logo`} />}
                          {data.carrierName}
                        </div>
                      </Td>
                      <Td>{data.price}</Td>
                      <Td>{data.destination}</Td>
                      <Td>{trackButton()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          {filteredData.length === 0 && <p>No matching orders found.</p>}
        </div>
      </div>
      {/* ... (Other components) */}
    </div>
  );
}

export default Orders;
