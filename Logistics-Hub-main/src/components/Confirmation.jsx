import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
    Select,
    Text,
  } from '@chakra-ui/react';

function Confirmation(props) {
 
const location = useLocation();
const { boxweight, boxLength, shippingCost, deliveryDate, fromLocation, toLocation } = location.state;
console.log(boxweight)
console.log(deliveryDate);
console.log(fromLocation);
const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    number: '',
    email: '',
    paymentMode: '',
    serviceProvider: '',
  });


  const handleAddToTableClick = () => {
    console.log("inside function --before");

    const logo =
      customerDetails.serviceProvider === 'UPS'
        ? 'ups.svg'
        : customerDetails.serviceProvider === 'USPS'
        ? 'usps.svg'
        : customerDetails.serviceProvider === 'Fedex'
        ? 'fedex.svg'
        : customerDetails.serviceProvider === 'DHL'
        ? 'dhl.svg'
        : 'cdl.svg';
        console.log("in handle");
        
    axios.post('http://localhost:8081/order', {
      name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.number,
      address: customerDetails.address,
      itemWeight: boxweight,
      packageDimensions: boxLength,
      serviceProvider: customerDetails.serviceProvider,
      deliveryDate: deliveryDate,
      destination: toLocation,
      logo: logo,
      price: shippingCost,
      paymentMode: customerDetails.paymentMode,
      cardNo: customerDetails.cardNo,
    
    })
      .then((res) => {
       
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);
       
        if (res.data === 'Error') {
          console.error('Login failed. Server returned an error:', res.data);

        } else {
         
          alert('Order placed successfully!');
    
        }
      });
  };


    

  
// Now, you can use shipmentData and shippingCost in your component
const handleCustomerDetailsChange = (e) => {
  
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };
return (
  <div>
   
    <form>
   fo':{fromLocation}
    <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input
                type='text'
                name='name'
                value={customerDetails.name}
                onChange={handleCustomerDetailsChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address:</FormLabel>
              <Input
                type='text'
                name='address'
                value={customerDetails.address}
                onChange={handleCustomerDetailsChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email ID:</FormLabel>
              <Input
                type='text'
                name='email'
                value={customerDetails.email}
                onChange={handleCustomerDetailsChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number:</FormLabel>
              <Input
                type='text'
                name='number'
                value={customerDetails.number}
                onChange={handleCustomerDetailsChange}
              />
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Service provider:</FormLabel>
            <Select
              name='serviceProvider'
              value={customerDetails.serviceProvider}
              onChange={handleCustomerDetailsChange}
            >
               <option value='selectDe'>Select service provider</option>
              <option value='DHL'>DHL</option>
              <option value='CDL'>CDL</option>
              <option value='USPS'>USPS</option>
              <option value='UPS'>UPS</option>
              <option value='FedEx'>FedEx</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Payment Method:</FormLabel>
            <Select
              name='paymentMode'
              value={customerDetails.paymentMode}
              onChange={handleCustomerDetailsChange}
            >
               <option value='select'>select method</option>
              <option value='creditcard'>credit card</option>
              <option value='cash'>cash</option>
              {/* Add more options as needed */}
            </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Card number:</FormLabel>
              <Input
                type='text'
                name='cardNo'
                value={customerDetails.cardNo}
                onChange={handleCustomerDetailsChange}
              />
            </FormControl>
            {/* Add other form fields for address, phone, email, paymentMode, and serviceProvider */}
            {/* ... (similar FormControl and Input components for other fields) */}

            <Button type='submit' onClick={handleAddToTableClick}>
              Submit Order
            </Button>
          </form>
  </div>
);
};

export default Confirmation
