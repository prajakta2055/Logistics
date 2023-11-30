import React, { useState, useEffect } from 'react';
import { Box, Text, Progress, Flex, Spacer, Divider } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

const OrderStatusLine = ({ trackingData }) => {
  const [status, setStatus] = useState(trackingData.status);
  const orderStatuses = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    // Update the status when trackingData.status changes
    setStatus(trackingData.status);
  }, [trackingData.status]);

  const getStatusPercentage = () => {
    const currentIndex = orderStatuses.indexOf(status);
    return (currentIndex / (orderStatuses.length - 1)) * 100;
  };

  return (
    <Box p={4}>
      <Text mb={4}>Current Status: {status}</Text>
      <Flex alignItems="center" position="relative">
        {orderStatuses.map((status, index) => (
          <React.Fragment key={status}>
            {index > 0 && <Spacer />}
            <Box flex={1} textAlign="center">
              {status}
            </Box>
          </React.Fragment>
        ))}
      </Flex>
      <Progress value={getStatusPercentage()} colorScheme="teal" />
      <Divider my={4} borderColor="gray.400" />
    </Box>
  );
};

export default OrderStatusLine;
