import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/datareview');
        const data = await response.json();
        console.log('Fetched data:', data);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button
          
          onClick={() => navigate('/homepage')}
        >
          Bact to Homepage
        </button>
      <h2>Service Provider Ratings</h2>
      {reviews.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default App;
