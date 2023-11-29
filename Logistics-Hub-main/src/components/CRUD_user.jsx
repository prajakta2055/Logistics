import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  VStack,
  Heading,
  Center,
  Input,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import Navbar from './Manager';

const UpdateUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    username: '',
    password: '',
    usertype: '',
    name: '',
    phone_number: '',
    email_address: '',
    address: '',
    // ... other fields from your data model
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/userdata');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    setSelectedUser(userToUpdate);
    setUpdateFormData(userToUpdate);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8081/user/${selectedUser.id}`, updateFormData);
      // Update the local state with the updated data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updateFormData } : user
        )
      );
      // Reset the selected user and update form data
      setSelectedUser(null);
      setUpdateFormData({});
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log(`Delete user with id ${id}`);
    try {
      await axios.delete(`http://localhost:8081/user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar tab={'Shipments'} />
     
      <Center>
        <Box>
          <VStack align="start" spacing={4}>
          {selectedUser ?(
            <Box>
                <Heading mb={4}>Update User Info</Heading>
                <VStack align="start" spacing={4}>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={updateFormData.username}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        username: e.target.value,
                      })
                    }
                    required
                  />

                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={updateFormData.password}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        password: e.target.value,
                      })
                    }
                    required
                  />

                  <Input
                    type="text"
                    name="usertype"
                    placeholder="Usertype"
                    value={updateFormData.usertype}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        usertype: e.target.value,
                      })
                    }
                    required
                  />

                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={updateFormData.name}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={updateFormData.phone_number}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        phone_number: e.target.value,
                      })
                    }
                  />

                  <Input
                    type="email"
                    name="email_address"
                    placeholder="Email Address"
                    value={updateFormData.email_address}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        email_address: e.target.value,
                      })
                    }
                    required
                  />

                  <Textarea
                    name="address"
                    placeholder="Address"
                    value={updateFormData.address}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        address: e.target.value,
                      })
                    }
                  />

                  {/* Add other input fields based on your data model */}
                  <Button onClick={handleUpdateSubmit}>Update User</Button>
                </VStack>
              </Box>
          ):
          
        (
            <Box>
            <Heading align="center">User Information</Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Password</Th>
                    <Th>Usertype</Th>
                    <Th>Name</Th>
                    <Th>Phone Number</Th>
                    <Th>Email Address</Th>
                    <Th>Address</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.username}</Td>
                      <Td>{user.password}</Td>
                      <Td>{user.usertype}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.phone_number}</Td>
                      <Td>{user.email_address}</Td>
                      <Td>{user.address}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          onClick={() => handleUpdate(user.id)}
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="red"
                          marginLeft="2"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
              

            )}
          </VStack>
        </Box>
      </Center>
    </div>
  );
};

export default UpdateUser;
