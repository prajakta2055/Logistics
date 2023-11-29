import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Bar, Doughnut  } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import Navbar from './Manager';
import axios from 'axios';

const Report = () => {
  const [reviews, setReviews] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/demo');
        const data = await response.json();
        console.log('Fetched data:', data);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount


  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/orderdata');
        setOrderData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // Create a data structure to count reviews for each service provider and rating
  const serviceProviderRatingCounts = reviews.reduce((acc, review) => {
    const serviceProviderName = review.serviceProviderName;
    const rating = parseInt(review.serviceProviderRating);

    if (!acc[serviceProviderName]) {
      acc[serviceProviderName] = Array(5).fill(0); // Initialize counts for each rating
    }

    acc[serviceProviderName][rating - 1] += 1; // Increment the count for the corresponding rating

    return acc;
  }, {});


  
  const serviceProviderNames = Object.keys(serviceProviderRatingCounts);

  // Define distinct colors for each rating
  const ratingColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(255, 205, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(153, 102, 255, 0.7)',
  ];

  const data = {
    labels: serviceProviderNames,
    datasets: Array.from({ length: 5 }, (_, index) => ({
      label: `Rating ${index + 1}`,
      data: serviceProviderNames.map(name => serviceProviderRatingCounts[name][index]),
      backgroundColor: ratingColors[index],
      borderColor: 'rgba(255, 255, 255, 1)', // Border color for each bar
      borderWidth: 1,
    })),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1, // Assuming you want integer steps on the y-axis
      },
      x: {
        title: {
          display: true,
          text: 'Service Providers',
        },
      },
    },
  };
//table 2
  const orderCountPerProvider = {};
  orderData.forEach((order) => {
    const serviceProvider = order.carrierName; // Replace with actual field name
    if (orderCountPerProvider[serviceProvider]) {
      orderCountPerProvider[serviceProvider]++;
    } else {
      orderCountPerProvider[serviceProvider] = 1;
    }
  });

  const dataOrders = {
    labels: Object.keys(orderCountPerProvider),
    datasets: [
      {
        label: 'Number of Orders',
        data: Object.values(orderCountPerProvider),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const optionsOrders = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
      x: {
        title: {
          display: true,
          text: 'Service Providers',
        },
      },
    },
  };

  //table 3
 // Initialize an object to store the total sale per service provider
const totalSalePerProvider = {};

// Iterate through each order and update the total sale for the corresponding service provider
orderData.forEach((order) => {
    const serviceProvider = order.carrierName; // Replace with the actual field name
    const saleAmount = parseFloat(order.price); // Typecast order.price to double
  
    console.log(order.carrierName, ':', order.price);
  
    if (!isNaN(saleAmount)) {
      if (totalSalePerProvider[serviceProvider]) {
        console.log(serviceProvider, ':', saleAmount);
        console.log('totalsale', saleAmount + totalSalePerProvider[serviceProvider]);
        totalSalePerProvider[serviceProvider] += saleAmount;
      } else {
        totalSalePerProvider[serviceProvider] = saleAmount;
      }
    } else {
      console.error('Invalid sale amount:', order.price);
    }
  });
  
console.log(totalSalePerProvider);
// Create data for the total sale per service provider graph
const dataTotalSale = {
  labels: Object.keys(totalSalePerProvider),
  datasets: [
    {
      label: 'Total Sale',
      data: Object.values(totalSalePerProvider),
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
  ],
};

// Options for the total sale per service provider graph
const optionsTotalSale = {
  scales: {
    y: {
      beginAtZero: true,
      // You may need to adjust the stepSize based on your sale amounts
      // For example, if sale amounts are in thousands, you might set stepSize: 1000
      stepSize: 1,
    },
    x: {
      title: {
        display: true,
        text: 'Service Providers',
      },
    },
  },
};
// donut chart 
const chartData = {
    labels: Object.keys(totalSalePerProvider),
    datasets: [
      {
        data: Object.values(totalSalePerProvider),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%', // Adjust the cutout percentage as needed
  };

// Now you can use dataTotalSale and optionsTotalSale to render your graph

  return (
    <div>
    <Navbar 
                tab={"Report"}
            />
     <Box display="flex" flexWrap="wrap">
      <Box
        maxWidth="1000px"
        margin="20px"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize="xl" mb="4">
          Service Provider Ratings
        </Text>
        {reviews.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p>No reviews available.</p>
        )}
      </Box>
      <Box
        maxWidth="600px"
        margin="20px"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize="xl" mb="4">
          Total Sale per Service Provider
        </Text>
        {orderData.length > 0 ? (
          <Bar data={dataTotalSale} options={optionsTotalSale} />
        ) : (
          <p>No sale data available.</p>
        )}
      </Box>
      <Box
        maxWidth="600px"
        margin="20px"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize="xl" mb="4">
          Number of Orders per Service Provider
        </Text>
        {orderData.length > 0 ? (
          <Bar data={dataOrders} options={optionsOrders} />
        ) : (
          <p>No order data available.</p>
        )}
      </Box>
      <Box
        maxWidth="600px"
        maxHeight="600px"
        margin="20px"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontSize="xl" mb="4">
          Total Sales Contribution by Service Provider
        </Text>
        {orderData.length > 0 ? (
          <Doughnut data={chartData} options={chartOptions} />
        ) : (
          <p>No order data available.</p>
        )}
      </Box>
    </Box>
    </div>
  );
};

export default Report;
