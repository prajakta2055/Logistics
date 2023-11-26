import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

const NewOrder = () => {
  const [shipmentData, setShipmentData] = useState({
    weight: '',
    size: '',
    boxLength: '',
    boxWidth: '',
    boxHeight: '',
    fromLocation: '',
    toLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({
      ...shipmentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform further actions with the shipmentData, e.g., send it to the server
    console.log('Shipment Data:', shipmentData);
    // Reset the form after submission
    setShipmentData({
      weight: '',
      size: '',
      boxLength: '',
      boxWidth: '',
      boxHeight: '',
      fromLocation: '',
      toLocation: '',
    });
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <h2>Create New Shipment</h2>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Item Weight:</FormLabel>
            <Input
              type="text"
              name="weight"
              value={shipmentData.weight}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Item Size:</FormLabel>
            <Input
              type="text"
              name="size"
              value={shipmentData.size}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Box Dimensions:</FormLabel>
            <Box>
              <FormControl>
                <FormLabel>Length:</FormLabel>
                <Input
                  type="text"
                  name="boxLength"
                  value={shipmentData.boxLength}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Width:</FormLabel>
                <Input
                  type="text"
                  name="boxWidth"
                  value={shipmentData.boxWidth}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Height:</FormLabel>
                <Input
                  type="text"
                  name="boxHeight"
                  value={shipmentData.boxHeight}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>From Location:</FormLabel>
            <Input
              type="text"
              name="fromLocation"
              value={shipmentData.fromLocation}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>To Location:</FormLabel>
            <Input
              type="text"
              name="toLocation"
              value={shipmentData.toLocation}
              onChange={handleChange}
            />
          </FormControl>

          <Button mt={4} type="submit">
            Create Shipment
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default NewOrder;
