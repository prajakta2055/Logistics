import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Confirmation from './Confirmation';
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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDEQ4J-WXRoHlO9LuaCfoMcOITAV6ySZr4',
    libraries: ['places'],
  });

 
  const [shipmentData, setShipmentData] = useState({
    weight: '',
    boxLength: '',
    boxWidth: '',
    boxHeight: '',
  });
  const [sampleData, setSampleData] = useState([]);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  let digits = '';
  const navigate = useNavigate();
  const originRef = useRef();
  const destiantionRef = useRef();
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [destination, setDestination] = useState('');
  
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

  async function calculateRoute() {
    // setShipmentData({fromLocation: originRef});
    // setShipmentData({toLocation:destiantionRef});
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
// eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
   
    const results = await directionsService.route({
      
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    console.log(results.request.destination.query);
    setFromLocation(results.request.origin.query);
    setDestination(results.request.destination.query);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    const deliveryDate = calculateDeliveryDate(results.routes[0].legs[0].duration.value);
    setEstimatedDeliveryDate(deliveryDate);
console.log(estimatedDeliveryDate);
    const newdist = parseFloat(results.routes[0].legs[0].distance.text) * 0.1;
    const calcQuote = parseFloat(calculateQuote());
    const actual = calcQuote + newdist;

    setShippingCost(actual);
  }

 
  const calculateQuote = () => {
    const { boxLength, boxWidth, boxHeight, weight } = shipmentData;
    const distanceValue = parseFloat(distance);
    const volume = boxLength * boxWidth * boxHeight;
    const weightQuote = weight * 0.5;
    const volumeQuote = volume * 0.2;

    const totalQuote = weightQuote + volumeQuote;
    return totalQuote.toFixed(2);
  };

 const handleSubmitclick = () => {
  console.log(fromLocation)
  navigate('/Confirmation', {
    state: {
      boxweight: shipmentData.weight,
      boxLength: shipmentData.boxLength,
      shippingCost: shippingCost,
      deliveryDate: estimatedDeliveryDate,
      fromLocation: fromLocation,
      toLocation: destination,
    }
  });
 }

 const handleSelect = (value) => {
  console.log(value);
  setInputValue(value);

  // Set your additional value based on the selected value or any other logic
  setShipmentData({fromLocation: value});

};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shipment Data:', shipmentData);
    setShipmentData({
      weight: '',
      boxLength: '',
      boxWidth: '',
      boxHeight: '',
      fromLocation: '',
      toLocation: '',
    });
  };

  return (
    <div>
      <Navbar tab={'NewOrder'} />

       
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
              name='serviceprovider'
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
  <Autocomplete  onSelect={(value) => setFromLocation(value)}>
    <Input type='text' placeholder='Origin'  ref={originRef} />
  </Autocomplete>
</Box>
<Box flexGrow={1}>
  <Autocomplete onSelect={(value) => setInputValue(value)}>
    <Input type='text' placeholder='Destination' ref={destiantionRef} />
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
                 <Button type='submit' onClick={handleSubmitclick}>
                 submit
               </Button>
              )}
            </HStack>
         
       
     

      <form>
        <Box position='absolute' left='50%' top='100%' h='620%' w='50%'>
        
          // eslint-disable-next-line no-undef
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