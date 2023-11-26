import * as React from 'react';
import { useEffect, useState } from 'react';
import '../index.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem } from "@mui/material";
import Box from '@mui/material/Box';

import Navbar from './Navbar';
import axios from 'axios';

function Orders() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [orderId, setOrderId] = React.useState("");
    const [customer, setCustomer] = React.useState("");
        const [itemName, setItemName] = React.useState("");
        const [itemWeight, setItemWeight] = React.useState("");
        const [packageDimensions, setPackageDimensions] = React.useState("");
        const [carrierLogo, setCarrierLogo] = React.useState("");
        const [carrierName, setCarrierName] = React.useState("");
        const [price, setPrice] = React.useState("");
        const [dateOrdered, setDateOrdered] = React.useState("");
        const [destination, setDestination] = React.useState("");
        const [sampleData, setSampleData] = React.useState([
            
        ]);

        useEffect(() => {
            // Fetch data when the component mounts
            axios.get('http://localhost:8081/orderdata')
              .then((response) => {
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                setSampleData(response.data.data);
                if (response.data.message === 'Data retrieved successfully') {
                } else {
                  //setError('Error fetching data: ' + response.data.error);
                }
              })
              .catch((err) => {
                //setError('Error fetching data: ' + err.message);
              });
          }, [sampleData]);
        const [searchTerm, setSearchTerm] = React.useState("");
        const [currentOrder, setCurrentOrder] = React.useState(null);
        const [showMapPopup, setShowMapPopup] = React.useState(false);

        const handleCreateLabelClick = () => {
            setShowPopup(true);
        };

        const handlePopupClose = () => {
            setShowPopup(false);
        };
      
        
        const handleAddToTableClick = (event) => {
            const logo = carrierName === "UPS" ? "ups.svg" :
            carrierName === "USPS" ? "usps.svg" :
            carrierName === "Fedex" ? "fedex.svg" :
            carrierName === "DHL" ? "dhl.svg" :
            "cdl.svg";
            axios.post('http://localhost:8081/order', {customer, itemName, itemWeight, packageDimensions, carrierName,dateOrdered,destination,logo, price})
            .then(res => {
              console.log('Response status:', res.status);
              console.log('Response data:', res.data);
                
        
              if (res.data === 'Error') {
                console.error('Login failed. Server returned an error:', res.data);
                
              } else {
                // Process the successful response data
                setSampleData([...sampleData,[customer, itemName, itemWeight, packageDimensions, carrierName,dateOrdered,destination,logo, price]] );
                alert('Order placed successfully!');
                setShowPopup(false); 
              }
            })

           
        };

        const handleSearchTermChange = (event) => {
            setSearchTerm(event.target.value);
        };

        const handleTrackButtonClick = (orderId, customer, itemName, itemWeight, packageDimensions, carrierName) => {
            setCurrentOrder({ orderId, customer, itemName, itemWeight, packageDimensions, carrierName });
            setShowMapPopup(true);
        };

        const handleMapPopupClose = () => {
            setCurrentOrder(null);
            setShowMapPopup(false);
        };

        const trackButton = () => {
            return (
                <Button onClick={() => handleTrackButtonClick(orderId, customer, itemName, itemWeight, packageDimensions, carrierName)}>
                    Track
                </Button>
            );
        };

        const filteredData = sampleData.filter((data) => {
            const searchRegex = new RegExp(searchTerm, "i");
            return searchRegex.test(data.orderId) || searchRegex.test(data.customer) || searchRegex.test(data.itemName) || searchRegex.test(data.carrierName);
        });

        return (
            <div style={{width: "100%"}}>
                <Navbar 
                    tab={"orders"}
                />
                <div className='main-body'>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                        <h4>
                            {sampleData.length === 0 ? "No Orders yet. But you'll get one. Welcome. 🙏🏻" : "Welcome. 🙏🏻"}
                        </h4>
                        <Button onClick={handleCreateLabelClick}>
                            Create a New Shipment Here
                        </Button>
                        <TextField label="Search" value={searchTerm} onChange={handleSearchTermChange} style={{marginBottom: "16px"}} />
                        {filteredData.length > 0 && (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>OrderId</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Date Ordered</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Customer</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Item</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Package</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Carrier</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Price</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Destination</TableCell>
                                            <TableCell style={{border: "1px solid black", fontWeight: 600}}>Track</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.map((data) => (
                                            <TableRow key={data.orderId}>
                                                <TableCell style={{border: "1px solid black"}}>{data.orderId}</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{data.dateOrdered}</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{data.customer}</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{data.itemName} ({data.itemWeight})</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{data.packageDimensions}</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>
                                                    <div style={{display:"flex", gap:"5px"}}>
                                                        { <img src={data.logo} style={{width:"30px"}}  /> }
                                                        {data.carrierName}
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{data.price}</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{data.destination}</TableCell>
                                                <TableCell style={{border: "1px solid black"}}>{trackButton()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {filteredData.length === 0 && (
                            <p>No matching orders found.</p>
                        )}
                    </div>
                </div>
                <Dialog open={showPopup} onClose={handlePopupClose}>
                    <DialogTitle>Create a new label</DialogTitle>
                    <DialogContent>
                        <TextField  type="date" value={dateOrdered} onChange={(e) => setDateOrdered(e.target.value)} fullWidth margin="normal" />
                        <TextField label="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} fullWidth margin="normal" />
                        <TextField label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} fullWidth margin="normal" />
                        <TextField label="Item Weight" value={itemWeight} onChange={(e) => setItemWeight(e.target.value)} fullWidth margin="normal" />
                        <TextField label="Package Dimensions" value={packageDimensions} onChange={(e) => setPackageDimensions(e.target.value)} fullWidth margin="normal" />
                        <TextField select label="Carrier Name" value={carrierName} onChange={(e) => setCarrierName(e.target.value)} fullWidth margin="normal">
                            <MenuItem value="UPS">UPS</MenuItem>
                            <MenuItem value="FedEx">FedEx</MenuItem>
                            <MenuItem value="USPS">USPS</MenuItem>
                            <MenuItem value="DHL">DHL</MenuItem>
                            <MenuItem value="CDL">CDL</MenuItem>
                        </TextField>
                        <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" />
                        <TextField label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} fullWidth margin="normal" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePopupClose}>Cancel</Button>
                        <Button onClick={handleAddToTableClick}>Add to table</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={showMapPopup} onClose={handleMapPopupClose} fullWidth maxWidth="md" maxHeight="md">
                    <DialogTitle>Track Order</DialogTitle>
                    <DialogContent>
                        {currentOrder && (
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBLD3HWQnIC_vkojQ6XAdenFaMG8H6bc2c&q=New+York+City`}
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleMapPopupClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    export default Orders;
