import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useUser } from './userContext';
import axios from 'axios';
import Navbar from './Navbar';
import Manager from './Manager';

// ... (imports)

const UserDetails = () => {
    const [sampleData, setSampleData] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({
      username: '',
      password: '',
      usertype: '',
      name: '',
      phone_number: '',
      email_address: '',
      // Add more fields as needed
    });
    const { user } = useUser();
    const { username, usertype } = user;
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/user/${username}`);
          if (response.data.message === 'Query executed successfully') {
            setSampleData([response.data.result]);
            console.log(sampleData);
            setUpdatedUser(response.data.result);
          } else {
            console.error('Error executing query:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      // Check if the username exists before fetching data
      if (username) {
        fetchUserData();
      }
    }, [username]); // Dependency array includes only 'username'
  
    // Function to handle the update button click
    const handleUpdateClick = async () => {
      try {
        console.log(sampleData[0].id);
        const response = await axios.put(`http://localhost:8081/user/${sampleData[0].id}`, updatedUser);
        if (response.data.message === 'User updated successfully') {
          console.log(updatedUser);
          setSampleData([updatedUser]);
          console.log('User updated successfully');
        } else {
          console.error('Error updating user:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    // Function to handle input changes for the update form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    return (
      <div>
      {
        usertype === 'customer'?
        <Navbar tab={'orders'} />:<Manager tab={'orders'} />
      }
        
        <Center>
          <Box width="600px">
            <Heading mb={4} textAlign="center" color="teal.500">
              User Details
            </Heading>
            {sampleData.map((user) => (
              <VStack spacing={4} align="start" key={user.id}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={user.username} onChange={handleInputChange}/>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="text" value={updatedUser.password} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>User Type</FormLabel>
                  <Input type="text" value={updatedUser.usertype} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={updatedUser.name} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="text" value={updatedUser.phone_number} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" value={updatedUser.email_address} onChange={handleInputChange} />
                </FormControl>
                {/* Add more fields as needed */}
                <Button colorScheme="teal" onClick={handleUpdateClick}>
                  Update User
                </Button>
              </VStack>
            ))}
          </Box>
        </Center>
      </div>
    );
  };
  
  export default UserDetails;
  