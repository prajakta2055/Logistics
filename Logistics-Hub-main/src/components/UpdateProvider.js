import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  VStack,
  Heading,
  Center,
  Input,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import Navbar from './Manager';
/* eslint-disable */

const UpdateProvider = () => {
  const navigate = useNavigate();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    provider_name: '',
    email: '',
    phone_number: '',
    // ... other fields from your data model
  });

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get('http://localhost:8081/serviceProvider');
        if(response.data.message === 'No service providers found')
        {
          // setError('No service providers found');
          alert('No service providers found');
          navigate('/AddProvider');
        }
        else{
        setServiceProviders(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching service providers:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleUpdate = (id) => {
    const providerToUpdate = serviceProviders.find((provider) => provider.id === id);
    setSelectedProvider(providerToUpdate);
    setUpdateFormData(providerToUpdate);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8081/updateProviders/${selectedProvider.id}`, updateFormData);
      // Update the local state with the updated data
      setServiceProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === selectedProvider.id ? { ...provider, ...updateFormData } : provider
        )
      );
      // Reset the selected provider and update form data
      setSelectedProvider(null);
      setUpdateFormData({});
      console.log('Service provider updated successfully');
    } catch (error) {
      console.error('Error updating service provider:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log(`Delete service provider with id ${id}`);
    try {
      await axios.delete(`http://localhost:8081/serviceProviders/${id}`);
      setServiceProviders((prevProviders) => prevProviders.filter((provider) => provider.id !== id));
      console.log(`Service provider with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting service provider:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    navigate('/AddProvider');
    return <p>No Service Providers were present add few</p>;
  }

  return (
    <div>
      <Navbar tab={'Shipments'} />
     
      <Center>
        <Box>
        <Heading align="center">Service Providers</Heading>
          <VStack align="start" spacing={4}>
          {selectedProvider?(
            <Box>
                <Heading mb={4}>Update Service Provider Info</Heading>
                <VStack align="start" spacing={4}>
                <Input
  type="text"
  name="provider_name"
  placeholder="Provider Name"
  value={updateFormData.provider_name}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, provider_name: e.target.value })
  }
  required
/>

<Input
  type="email"
  name="email"
  placeholder="Email"
  value={updateFormData.email}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, email: e.target.value })
  }
  required
/>

<Input
  type="tel"
  name="phone_number"
  placeholder="Phone Number"
  value={updateFormData.phone_number}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, phone_number: e.target.value })
  }
/>

<Textarea
  name="address"
  placeholder="Address"
  value={updateFormData.address}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, address: e.target.value })
  }
/>

<Checkbox
  name="shipping_service"
  isChecked={updateFormData.shipping_service}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      shipping_service: e.target.checked,
    })
  }
>
  Shipping Service
</Checkbox>

<Checkbox
  name="tracking_service"
  isChecked={updateFormData.tracking_service}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      tracking_service: e.target.checked,
    })
  }
>
  Tracking Service
</Checkbox>

<Checkbox
  name="express_delivery_service"
  isChecked={updateFormData.express_delivery_service}
  onChange={(e) =>
    setUpdateFormData({
      ...updateFormData,
      express_delivery_service: e.target.checked,
    })
  }
>
  Express Delivery Service
</Checkbox>

<Input
  type="text"
  name="logo"
  placeholder="Logo"
  value={updateFormData.logo}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, logo: e.target.value })
  }
/>

<Input
  type="text"
  name="agreement"
  placeholder="Agreement"
  value={updateFormData.agreement}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, agreement: e.target.value })
  }
/>

<Input
  type="number"  // Change the type to "text"
  name="rate"
  placeholder="Rate"
  value={updateFormData.rate}
  onChange={(e) =>
    setUpdateFormData({ ...updateFormData, rate: e.target.value })}
/>

                  {/* Add other input fields based on your data model */}
                  <Button onClick={handleUpdateSubmit}>Update Service Provider</Button>
                </VStack>
              </Box>
            )
             :( 
              <Box>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Provider Name</Th>
                    <Th>Email</Th>
                    <Th>Phone Number</Th>
                    <Th>Address</Th>
                    <Th>Shipping</Th>
                    <Th>Tracking</Th>
                    <Th>Express Delivery</Th>
                    <Th>Rate($)</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {serviceProviders.map((provider) => (
                    <Tr key={provider.id}>
                      <Td>{provider.provider_name}</Td>
                      <Td>{provider.email}</Td>
                      <Td>{provider.phone_number}</Td>
                      <Td>{provider.address}</Td>
                      <Td>{provider.shipping_service === 1 ? 'Yes' : 'No'}</Td>
<Td>{provider.tracking_service === 1 ? 'Yes' : 'No'}</Td>
<Td>{provider.express_delivery_service === 1 ? 'Yes' : 'No'}</Td>
                      
                      <Td>{provider.rate}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          onClick={() => handleUpdate(provider.id)}
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="red"
                          marginLeft="2"
                          onClick={() => handleDelete(provider.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
              
            )}
          </VStack>
        </Box>
      </Center>
    </div>
  );
};

export default UpdateProvider;
