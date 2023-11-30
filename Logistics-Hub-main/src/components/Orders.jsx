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
  VStack,
  TableContainer,
  FormControl,
  FormLabel,
  Box,
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
  const [selectedUser, setSelectedUser] = useState(null);

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
  const [updateFormData, setUpdateFormData] = useState({
    orderId: '',
    customer: '',
    itemWeight: '',
    packageDimensions: '',
    carrierName: '',
    dateOrdered: '',
    destination: '',
    logo: '',
    price: '',
    phone_number: '',
    email_address: '',
    address: '',
    payment_method: '',
    card_no: '',
    fromLocation: '',
    zipcode: '',
    // ... other fields from your data model
  });
  

  
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

  const handleUpdate = (id) => {
    const userToUpdate = sampleData.find((user) => user.orderId === id);
    setSelectedUser(userToUpdate);
    setUpdateFormData(userToUpdate);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8081/order/${selectedUser.orderId}`, updateFormData);
      // Update the local state with the updated data
      setSampleData((prevUsers) =>
        prevUsers.map((user) =>
          user.orderId === selectedUser.orderId ? { ...user, ...updateFormData } : user
        )
      );
      // Reset the selected user and update form data
      setSelectedUser(null);
      setUpdateFormData({});
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };




  const handleDelete = async (id) => {
    console.log(`Delete user with id ${id}`);
    try {
      await axios.delete(`http://localhost:8081/order/${id}`);
      setSampleData((prevUsers) => prevUsers.filter((sampleData) => sampleData.orderId !== id));
      console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
      {!selectedUser ?
        (<div className="main-body">
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
                    <Th>Package Dimensions (inch)</Th>
                    <Th>Carrier</Th>
                    <Th>Price</Th>
                    <Th>From Location</Th>
                    <Th>Destination</Th>
                    <Th>Track</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map((data) => (
                    <Tr key={data.orderId}>
                      <Td>{data.orderId}</Td>
                      <Td>{data.dateOrdered}</Td>
                      <Td>{data.customer}</Td>
                      <Td>{data.packageDimensions}</Td>
                      <Td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {<img src={data.logo} style={{ width: '30px' }} alt={`${data.carrierName} logo`} />}
                          {data.carrierName}
                        </div>
                      </Td>
                      <Td>{data.price}</Td>
                      <Td>{data.fromLocation}</Td>
                      <Td>{data.destination}</Td>
                      <Td>{trackButton()}</Td>
                      <Td><Button
                          colorScheme="teal"
                          onClick={() => handleUpdate(data.orderId)}
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="red"
                          marginLeft="2"
                          onClick={() => handleDelete(data.orderId)}
                        >
                          Delete
                        </Button></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          {filteredData.length === 0 && <p>No matching orders found.</p>}
        </div>
      </div>):(
        <Box
  width="600px"
  margin="auto"
  marginTop="50px"
  border="1px solid #ddd"
  padding="20px"
  borderRadius="8px"
  boxShadow="md"
>
        <div>
        <VStack align="start" spacing={4}>
        <Input
  type="text"
  name="customer"
  placeholder="Customer"
  value={updateFormData.customer}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      customer: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="itemWeight"
  placeholder="Item Weight"
  value={updateFormData.itemWeight}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      itemWeight: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="packageDimensions"
  placeholder="Package Dimensions"
  value={updateFormData.packageDimensions}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      packageDimensions: e.target.value,
    })
  }
/>

<FormControl mt={4}>
  <FormLabel>Carrier Name:</FormLabel>
  <Select
    name='carrierName'
    value={updateFormData.carrierName}
    onChange={(e) =>
      setUpdateFormData({
        ...updateFormData,
        carrierName: e.target.value,
      })
    }
  >
    <option value='DHL'>DHL</option>
    <option value='CDL'>CDL</option>
    <option value='USPS'>USPS</option>
    <option value='UPS'>UPS</option>
    <option value='FedEx'>FedEx</option>
    {/* Add more options as needed */}
  </Select>
</FormControl>

<Input
  type="text"
  name="dateOrdered"
  placeholder="Date Ordered"
  value={updateFormData.dateOrdered}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      dateOrdered: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="destination"
  placeholder="Destination"
  value={updateFormData.destination}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      destination: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="logo"
  placeholder="Logo"
  value={updateFormData.logo}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      logo: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="price"
  placeholder="Price"
  value={updateFormData.price}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      price: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="phone_number"
  placeholder="Phone Number"
  value={updateFormData.phone_number}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      phone_number: e.target.value,
    })
  }
/>

<Input
  type="email"
  name="email_address"
  placeholder="Email Address"
  value={updateFormData.email_address}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      email_address: e.target.value,
    })
  }
/>

<Input
  type="text"
  name="address"
  placeholder="Address"
  value={updateFormData.address}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      address: e.target.value,
    })
  }
/>


  {/* Add more input fields as needed */}
</VStack>
<Button onClick={handleUpdateSubmit}>Update User</Button>
</div>
</Box>
      )}
      
     
      {/* ... (Other components) */}
    </div>
  );
}

export default Orders;
