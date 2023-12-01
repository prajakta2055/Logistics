/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Input,
    Select,
    MenuItem,
    TableContainer,
  } from '@chakra-ui/react';
import { GoogleMap, Polyline, Marker, LoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getLatLng, getGeocode } from 'use-places-autocomplete';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import axios from 'axios';
import carIconUrl from './car.png';
import Navbar from './Manager';
import OrderStatusDemo from './OrderStatusLine'; // Update the path accordingly


function OrdersManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [customer, setCustomer] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [packageDimensions, setPackageDimensions] = useState('');
  const [carrierLogo, setCarrierLogo] = useState('');
  const [carrierName, setCarrierName] = useState('');
  const [price, setPrice] = useState('');
  const [dateOrdered, setDateOrdered] = useState('');
  const [destination, setDestination] = useState('');
  const [sampleData, setSampleData] = useState([]);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showMapPopup, setShowMapPopup] = useState(false);
  
  
  const openStatusDialog = () => {
    setShowStatusDialog(true);
  };

  const closeStatusDialog = () => {
    setShowStatusDialog(false);
  };
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://localhost:8081/orderdata')
      .then((response) => {
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        setSampleData(response.data.data);
        if (response.data.message === 'Data retrieved successfully') {
          console.log('Data retrieved successfully');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function getRandomLocationBetween(origin, destination) {
    const latRatio = Math.random();
    const lngRatio = Math.random();
    const latDiff = destination.lat - origin.lat;
    const lngDiff = destination.lng - origin.lng;
    const randomLat = origin.lat + latRatio * latDiff;
    const randomLng = origin.lng + lngRatio * lngDiff;
    return { lat: randomLat, lng: randomLng };
  }

  const handleTrackButtonClick = async (orderId, customer, itemName, itemWeight, packageDimensions, carrierName) => {
  try {
    const response = await axios.get(`http://localhost:8081/trackingData`, {
      params: {
        orderId: orderId,
      },
    });
    setTrackingData(response.data.data[0]);
    const trackingData1 = response.data.data[0];
    const originLatLng = { lat: parseFloat(trackingData1.originLat), lng: parseFloat(trackingData1.originLon) }; // San Jose, CA
    const destinationLatLng = { lat: parseFloat(trackingData1.destinationLat), lng: parseFloat(trackingData1.destinationLon) }; // Los Angeles, CA
    const randomLocationBetween = getRandomLocationBetween(originLatLng, destinationLatLng);
    const waypointsLatLng = [originLatLng, randomLocationBetween, destinationLatLng];

    setCurrentOrder({
      orderId,
      customer,
      itemName,
      itemWeight,
      packageDimensions,
      carrierName,
      randomLocation : randomLocationBetween,
      origin: originLatLng,
      destination: destinationLatLng,
      waypoints: waypointsLatLng,
    });

    openStatusDialog();
    setShowMapPopup(true);
  } catch (error) {
    console.error('Error fetching tracking data:', error.message);
  }
};

  const handleCreateLabelClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAddToTableClick = () => {
    const logo =
      carrierName === 'UPS'
        ? 'ups.svg'
        : carrierName === 'USPS'
        ? 'usps.svg'
        : carrierName === 'Fedex'
        ? 'fedex.svg'
        : carrierName === 'DHL'
        ? 'dhl.svg'
        : 'cdl.svg';
    axios
      .post('http://localhost:8081/order', {
        customer,
        itemName,
        itemWeight,
        packageDimensions,
        carrierName,
        dateOrdered,
        destination,
        logo,
        price,
      })
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);

        if (res.data === 'Error') {
          console.error('Login failed. Server returned an error:', res.data);
        } else {
          // Process the successful response data
          setSampleData([
            ...sampleData,
            [customer, itemName, itemWeight, packageDimensions, carrierName, dateOrdered, destination, logo, price],
          ]);
          alert('Order placed successfully!');
          setShowPopup(false);
        }
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (orderId, status) => {
    axios
      .post('http://localhost:8081/updateOrder', { orderId, status })
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response data:', res.data);
        alert('Status updated successfully!');
        // Update the status in local state
        setSampleData((prevData) =>
          prevData.map((data) =>
            data.orderId === orderId ? { ...data, status } : data
          )
        );
      });
  };

  const handleShippedButtonClick = () => {
    setShowMapPopup(true);
    simulateOrderProgress();
    console.log('Shipped button clicked!');
  };

  const handleMapPopupClose = () => {
    setCurrentOrder(null);
    setShowMapPopup(false);
  };

  const trackButton = (data) => {
    return (
      <Button onClick={() => handleTrackButtonClick(data.orderId, data.customer, data.itemName, data.itemWeight, data.packageDimensions, data.carrierName)}>
        Track
      </Button>
    );
  };

  const filteredData = sampleData.filter((data) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return searchRegex.test(data.orderId) || searchRegex.test(data.customer) || searchRegex.test(data.itemName) || searchRegex.test(data.carrierName);
  });

  return (
    <div style={{ width: '100%' }}>
      <Navbar tab={'orders'} />
      <div className="main-body">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h4>{sampleData.length === 0 ? "No Orders yet. But you'll get one. Welcome. 🙏🏻" : 'Welcome. 🙏🏻'}</h4>
          <Button onClick={handleCreateLabelClick}>Create a New Shipment Here</Button>
          <Input label="Search" value={searchTerm} onChange={handleSearchTermChange} style={{ marginBottom: '16px' }} />
          {filteredData.length > 0 && (
            <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>OrderId</Th>
                  <Th>Date Ordered</Th>
                  <Th>Customer</Th>
                  <Th>Item</Th>
                  <Th>Package</Th>
                  <Th>Carrier</Th>
                  <Th>Price</Th>
                  <Th>Destination</Th>
                  <Th>Track</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((data) => (
                  <Tr key={data.orderId}>
                    <Td>{data.orderId}</Td>
                    <Td>{data.dateOrdered}</Td>
                    <Td>{data.customer}</Td>
                    <Td>{`${data.itemName} (${data.itemWeight})`}</Td>
                    <Td>{data.packageDimensions}</Td>
                    <Td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {<img src={data.logo} style={{ width: '30px' }} alt={`${data.carrierName} logo`} />}
                        {data.carrierName}
                      </div>
                    </Td>
                    <Td>{data.price}</Td>
                    <Td>{data.destination}</Td>
                    <Td>{trackButton(data)}</Td>
                    <Td>
                      <select style={{width:"fit-content"}} value={data.status} onChange={(e) => handleStatusChange(data.orderId, e.target.value)} disabled={data.status === "Delivered"}>
                        <option value="Ordered">Ordered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          )}
          {filteredData.length === 0 && <p>No matching orders found.</p>}
        </div>
      </div>

      {currentOrder && (
        <Modal isOpen={showStatusDialog} onClose={closeStatusDialog} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <OrderStatusDemo trackingData={trackingData} />
              {trackingData.status === 'Shipped' && (
                 <>
                 <Button onClick={handleShippedButtonClick}>Shipped</Button>
                 {showMapPopup && (
                   // Render maps below the "Shipped" button
                   <LoadScript googleMapsApiKey="AIzaSyBLD3HWQnIC_vkojQ6XAdenFaMG8H6bc2c">
                     <GoogleMap
                       mapContainerStyle={{ width: '100%', height: '400px' }}
                       zoom={8}
                       center={currentOrder.waypoints[0]}>

                       <Polyline path={[currentOrder.origin, ...currentOrder.waypoints, currentOrder.destination]}
                         options={{ strokeColor: '#0000FF', strokeWeight: 2 }}
                       />
                        
                       <Marker position={currentOrder.origin} label="Origin" />
                       <Marker position={currentOrder.destination} label="Destination" />
                       <Marker position={currentOrder.randomLocation} icon={{ url: carIconUrl, scaledSize: { width: 50, height: 50 } }} />
                     </GoogleMap>
                   </LoadScript>
                 )}
               </>
             )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default OrdersManager;
