// Import necessary libraries
import React, { useState } from 'react';
import { Box, Heading, VStack, Input, Textarea, Checkbox, Button } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './Manager';

const AddProvider = () => {
  const [formData, setFormData] = useState({
    provider_name: '',
    email: '',
    phone_number: '',
    address: '',
    shipping_service: false,
    tracking_service: false,
    express_delivery_service: false,
    logo: '',
    agreement: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend to add a new service provider
      const response = await axios.post('http://localhost:8081/AddserviceProviders', formData);
      const result = response.data.result;
      console.log(result);
      alert('Service provider Added Successfully');
      // Handle the result as needed

      // Clear the form after successful submission
      setFormData({
        provider_name: '',
        email: '',
        phone_number: '',
        address: '',
        shipping_service: false,
        tracking_service: false,
        express_delivery_service: false,
        logo: '',
        agreement: '',
        rate: '',
      });
    } catch (error) {
      console.error('Error adding service provider:', error);
    }
  };

  return (
    <div>
        <Navbar 
                tab={"Shipments"}
            />
    <Box>
      <Heading mb={4} textAlign="center">
          Add Service Provider
        </Heading>
      <form onSubmit={handleSubmit}>
        <VStack align="start" spacing={4}>
          <Input
            type="text"
            name="provider_name"
            placeholder="Provider Name"
            value={formData.provider_name}
            onChange={handleInputChange}
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />

          <Textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <Checkbox
            name="shipping_service"
            isChecked={formData.shipping_service}
            onChange={handleInputChange}
          >
            Shipping Service
          </Checkbox>

          <Checkbox
            name="tracking_service"
            isChecked={formData.tracking_service}
            onChange={handleInputChange}
          >
            Tracking Service
          </Checkbox>

          <Checkbox
            name="express_delivery_service"
            isChecked={formData.express_delivery_service}
            onChange={handleInputChange}
          >
            Express Delivery Service
          </Checkbox>

          <Input
            type="text"
            name="logo"
            placeholder="Logo"
            value={formData.logo}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="agreement"
            placeholder="Agreement"
            value={formData.agreement}
            onChange={handleInputChange}
          />

          <Input
            type="number"  
            name="rate"
            placeholder="Rate"
            value={formData.rate}
            onChange={handleInputChange}
          />
          <Button type="submit">Add Service Provider</Button>
        </VStack>
      </form>
    </Box>
    </div>
  );
};

export default AddProvider;
