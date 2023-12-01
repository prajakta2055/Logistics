import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'; 
import React, { useEffect, useState } from 'react';

import '../index.css';
import Navbar from './Navbar';
import { useUser } from './userContext';


function Shipments() {
    


  
  const { user } = useUser();
  const { usertype, username } = user;
  

 


  

  
  // google
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchLocations();
    }
  }, [userLocation]);

  const fetchLocations = async () => {
    try {
      const radius = 10;
      const query = `
        SELECT *
        FROM locations
        WHERE
        ACOS(
          SIN(RADIANS(${userLocation.lat})) * SIN(RADIANS(latitude)) +
          COS(RADIANS(${userLocation.lat})) * COS(RADIANS(latitude)) *
          COS(RADIANS(${userLocation.lng} - longitude))
        ) * 6371 <= ${radius}
        LIMIT 5;`;

      const response = await axios.post('http://localhost:8081/location', {
        queryType: 'custom',
        customQuery: query,
      });

      const nearbyLocations = response.data.result;
      setLocations(nearbyLocations); // Update state with fetched locations
    } catch (error) {
      console.error('Error querying nearby locations:', error);
    }
  };

  useEffect(() => {
    if (userLocation) {
      initMap();
    }
  }, [userLocation, locations]);

  function initMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 15,
    });
  
    const userMarker = new window.google.maps.Marker({
        position: userLocation,
    map: map,
    title: 'You are here!',
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL to a red marker icon
      scaledSize: new window.google.maps.Size(42, 42), // Adjust the size as needed
    },
    });
  
    const markers = locations.map((place) => {
      return new window.google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: map,
        title: place.name,
      });
    });
  
    // Create a LatLngBounds object to contain all markers
    const bounds = new window.google.maps.LatLngBounds();
  
    // Extend the bounds with each marker's position
    markers.forEach(marker => bounds.extend(marker.getPosition()));
  
    // Fit the map to the bounds
    map.fitBounds(bounds);
  }
  

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDEQ4J-WXRoHlO9LuaCfoMcOITAV6ySZr4&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div>
      
    <Navbar 
                  tab={"Shipments"}
              />
            <Box position='absolute' left='0%' top='0%' h='50%' w='100%'>  
    <div className="text-gray-600 body-font section" style={{ width: '50%', marginRight: 'auto',marginTop: 0 }}>
    <div className="container mx-auto">
      <div className="bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0" style={{ marginTop: 0 }}>
        <h2 className="title mb-5 lg:mb-10 text-center max-w-[920px] mx-auto">
          Why don't you give us a try
        </h2>
        <p className="leading-relaxed text-center mb-3 text-[30px] font-medium">
          We're <em>READY</em> to <em>RUN</em> for <em>YOU!</em>
        </p>
        <h2 className="leading-relaxed text-center mb-3 text-[30px] font-medium">
          Service Providers
        </h2>
        <div className="container">
          <section id="service-providers justify-center">
            <div className="flex flex-row p-10 gap-[30px] justify-center">
              <div><img src="usps_r.svg" /></div>
              <div><img src="ups_r.svg" /></div>
              <div><img src="fedex.svg" /></div>
              <div><img src="dhl_r.svg" /></div>
              <div><img src="cdl.svg" /></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  </Box>
    <div className='flex'>
    
    <Flex
  position='relative'
  flexDirection='column'
  alignItems='center'
  h='100vh'
  w='100vw'
>

  <Box position='absolute' left='50%' top='10%' h='100%' w='70%'>
    <Heading>Find near me drop locations </Heading>
  <div id="map" style={{ height: '600px', width: '70%' }}></div>
  </Box>
</Flex>
</div>
    </div>)



    }

    export default Shipments;
