/* global google */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  SkeletonText,
  Text,
  HStack,
} from '@chakra-ui/react';

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

import Navbar from './Navbar';


const center = { lat: 41.8781, lng: -87.6298 };


const NewOrder = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDEQ4J-WXRoHlO9LuaCfoMcOITAV6ySZr4',
    libraries: ['places'],
    // Add the following callback
    onLoad: () => console.log('Google Maps API loaded successfully'),
  });
  const navigate = useNavigate();
  const [shipmentData, setShipmentData] = useState({
    weight: '',
    boxLength: '',
    boxWidth: '',
    boxHeight: '',
    serviceProvider: '',
  });
  const [sampleData, setSampleData] = useState([]);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [fromLocation, setFromLocation] = useState('');
  const [originCo, setOriginCo] = useState('');
  const [destCo, setDestCo] = useState('');
  const [destination, setDestination] = useState('');
  let digits = '';

  const originRef = useRef();
  const destiantionRef = useRef();
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMode: '',
    serviceProvider: '',
  });

  useEffect(() => {
    console.log("fromLocation", fromLocation);
    console.log("destination", destination);
    console.log("originCo", originCo);
    console.log("destCo", destCo);
  }, [fromLocation, destination]);

  
  const handlePlaceOrder = () => {
    
    setCustomerDetails({
      name: '',
      address: '',
      zipcode:'',
      phone: '',
      email: '',
      paymentMode: '',
      serviceProvider: '',
      cardNo:'',
    });
    setIsOrderPlaced(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({
      ...shipmentData,
      [name]: value,
    });
  };

  const calculateDeliveryDate = (durationInSeconds) => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate.getTime() + durationInSeconds * 1000);

    // Format the delivery date as a string (adjust the format as needed)
    const formattedDeliveryDate = deliveryDate.toDateString();

    return formattedDeliveryDate;
  };  

  async function calculateRoute(event) {
    event.preventDefault();
  
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
  
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
  
    setOriginCo({
      lat: results.routes[0].legs[0].start_location.lat(),
      lng: results.routes[0].legs[0].start_location.lng(),
    });
  
    setDestCo({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });
    setFromLocation(results.request.origin.query);
    setDestination(results.request.destination.query);
    setDirectionsResponse(results);
  
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    const deliveryDate = calculateDeliveryDate(results.routes[0].legs[0].duration.value);
    setEstimatedDeliveryDate(deliveryDate);
  
    const newdist = parseFloat(results.routes[0].legs[0].distance.text) * 0.1;
    const calcQuote = parseFloat(calculateQuote());
    const actual = calcQuote + newdist;
  
    setShippingCost(actual);
  }
  

  const handleAddToTableClick = (event) => {
    event.preventDefault();
    console.log(shipmentData);
   

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
        
        
    axios.post('http://localhost:8081/order', {
      name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: customerDetails.address,
      itemWeight: shipmentData.weight,
      packageDimensions: shipmentData.boxLength,
      serviceProvider: shipmentData.serviceProvider,
      deliveryDate: estimatedDeliveryDate,
      originCo: originCo,
      destCo: destCo,
      destination: destination,
      logo: logo,
      price: shippingCost,
      paymentMode: customerDetails.paymentMode,
      cardNo: customerDetails.cardNo,
      zipcode: customerDetails.zipcode,
      fromLocation: fromLocation,
    
    })
      .then((res) => {
        navigate('/trackingpage');
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);
       
        if (res.data === 'Error') {
          console.error('Login failed. Server returned an error:', res.data);

        } else {
          navigate('/trackingpage');
          alert('Order placed successfully!');
    
        }
      });
  };
  const calculateQuote = () => {
    const { boxLength, boxWidth, boxHeight, weight } = shipmentData;
    const distanceValue = parseFloat(distance);
    const volume = boxLength * boxWidth * boxHeight;
    const weightQuote = weight * 0.5;
    const volumeQuote = volume * 0.2;

    const totalQuote = weightQuote + volumeQuote;
    return totalQuote.toFixed(2);
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shipment Data:', shipmentData);
    // setShipmentData({
    //   weight: '',
    //   boxLength: '',
    //   boxWidth: '',
    //   boxHeight: '',
    //   fromLocation: '',
    //   toLocation: '',
    // });
  };

  return (
    <div>
      <Navbar tab={'NewOrder'} />

      <Box p={4} position='absolute' left='0%' top='80%' h='50%' w='50%'>
        {isOrderPlaced ? (
          <form>
            <HStack spacing={4} mt={4} justifyContent='space-between'>
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
              {digits = distance.replace(/\D/g, '')}
              <Text>Total Shipment Cost: ${shippingCost} </Text>
              {estimatedDeliveryDate && (
          <Text>Estimated Delivery Date: {estimatedDeliveryDate}</Text>
        )}
              </HStack>
            {/* Add form fields for customer details */}
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
              <FormLabel>Zipcode:</FormLabel>
              <Input
                type='text'
                name='zipcode'
                value={customerDetails.zipcode}
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
                name='phone'
                value={customerDetails.phone}
                onChange={handleCustomerDetailsChange}
              />
            </FormControl>
           
      
          <FormControl mt={4}>
  <FormLabel>Payment Method:</FormLabel>
  <Select
    name='paymentMode'
    value={customerDetails.paymentMode}
    onChange={handleCustomerDetailsChange}
  >
    <option value='select'>Select method</option>
    <option value='creditcard'>Credit Card</option>
    <option value='cash'>Cash</option>
    {/* Add more options as needed */}
  </Select>
</FormControl>

{customerDetails.paymentMode === 'creditcard' && (
  <FormControl>
    <FormLabel>Card number:</FormLabel>
    <Input
      type='text'
      name='cardNo'
      value={customerDetails.cardNo}
      onChange={handleCustomerDetailsChange}
    />
  </FormControl>
)}


            <Button type='submit' onClick={handleAddToTableClick}>
              Submit Order
            </Button>
          
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Item Weight:</FormLabel>
              <Input
                type='text'
                name='weight'
                value={shipmentData.weight}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Box Dimensions:</FormLabel>
              <Box>
                <FormControl>
                  <FormLabel>Length:</FormLabel>
                  <Input
                    type='text'
                    name='boxLength'
                    value={shipmentData.boxLength}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Width:</FormLabel>
                  <Input
                    type='text'
                    name='boxWidth'
                    value={shipmentData.boxWidth}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Height:</FormLabel>
                  <Input
                    type='text'
                    name='boxHeight'
                    value={shipmentData.boxHeight}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </FormControl>
            <FormControl mt={4}>
            <FormLabel>Service provider:</FormLabel>
            <Select
              name='serviceProvider'
              value={shipmentData.serviceProvider}
              onChange={handleChange}
            >
              <option value='DHL'>DHL</option>
              <option value='CDL'>CDL</option>
              <option value='USPS'>USPS</option>
              <option value='UPS'>UPS</option>
              <option value='FedEx'>FedEx</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

            <HStack spacing={2} justifyContent='space-between'>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input type='text' placeholder='Origin' ref={originRef} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    type='text'
                    placeholder='Destination'
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                {!isValid && (
                  <Text color='red' fontSize='sm' mt={1}>
                    Please enter only numeric digits.
                  </Text>
                )}
              </Box>
            </HStack>

            <Button mt={4} type='submit' onClick={calculateRoute}>
              Get quote
            </Button>

            <HStack spacing={4} mt={4} justifyContent='space-between'>
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
              {digits = distance.replace(/\D/g, '')}
              <Text>Shipment Cost: ${shippingCost} </Text>

              {shippingCost !== 0 && (
                <Button onClick={handlePlaceOrder}>
                  Proceed to Place Order
                </Button>
              )}
            </HStack>
          </form>
        )}
      </Box>
      

      <form>
        <Box position='absolute' left='50%' top='100%' h='620%' w='50%'>
        
          
          <GoogleMap
            center={center}
            zoom={10}
            mapContainerStyle={{ width: '80%', height: '80%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            //onLoad={map => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
      </form>
    </div>
  );
};

export default NewOrder;