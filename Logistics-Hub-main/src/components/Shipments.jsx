import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

import '../index.css';
import Navbar from './Navbar';
import { useUser } from './userContext';

const center = { lat: 41.8781, lng: -87.6298 };
function Shipments() {
    
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDEQ4J-WXRoHlO9LuaCfoMcOITAV6ySZr4',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { user } = useUser();
  const { usertype, username } = user;
  let digits = '';

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }


  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    console.log(results.routes[0].legs[0].distance.text)
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Check if the input contains only digits
    setIsValid(/^\d*$/.test(newValue));
  };
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <div>
    <Navbar 
                tab={"Shipments"}
            />
             
     <div className="flex">             
    <div className="text-gray-600 body-font section">
      <div className="container   mx-auto">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2
            className="title mb-5 lg:mb-10 text-center max-w-[920px] mx-auto"
            
          >
            Why don't you give us a try
          </h2>
          <p
            className="leading-relaxed text-center mb-3 text-[30px] font-medium"
       
          >
            We're <em>READY</em> to <em>RUN</em> for <em>YOU!</em>
          </p>
          <h2 className="leading-relaxed text-center mb-3 text-[30px] font-medium">Service Providers</h2>
          <div className="container">
            <section id="service-providers justify-center">
           
              <div className="flex flex-row p-10 gap-[30px]  justify-center">
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
    </div>
    
    <div className='flex'>
    <Flex
  position='relative'
  flexDirection='column'
  alignItems='center'
  h='100vh'
  w='100vw'
>
  <Box position='absolute' left='25%' top='25%' h='50%' w='50%'>
    {/* Google Map Box */}
    <GoogleMap
      center={center}
      zoom={10}
      mapContainerStyle={{ width: '100%', height: '100%' }}
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
  <Box
    p={4}
    borderRadius='lg'
    m={4}
    bgColor='white'
    shadow='base'
    minW='container.md'
    zIndex='1'
  >
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
  <Input
    type='text'
    placeholder='Weight'
    value={inputValue}
    onChange={handleInputChange}
  />
  {!isValid && (
    <Text color='red' fontSize='sm' mt={1}>
      Please enter only numeric digits.
    </Text>
  )}
</Box>
      <ButtonGroup>
        <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
          Calculate Shippment Cost
        </Button>
        <IconButton
          aria-label='center back'
          icon={<FaTimes />}
          onClick={clearRoute}
        />
      </ButtonGroup>
    </HStack>
    <HStack spacing={4} mt={4} justifyContent='space-between'>
      <Text>Distance: {distance} </Text>
      <Text>Duration: {duration} </Text>
      {digits = distance.replace(/\D/g, '')}
      <Text>Shippment Cost: $ {digits*2} </Text>
      {/* <IconButton
        aria-label='center back'
        icon={<FaLocationArrow />}
        isRound
        onClick={() => {
          map.panTo(center)
          map.setZoom(15)
        }}
      /> */}
    </HStack>
  </Box>
</Flex>
</div>
    </div>)



    }

    export default Shipments;
