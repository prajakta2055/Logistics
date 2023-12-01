const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { json } = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "logistic"
})

app.post('/user', (req, res) => {
    const sql = "SELECT * from user WHERE username=? AND password=? AND usertype=?";

    db.query(sql, [req.body.username,req.body.password,req.body.usertype], (err, data) => {
        console.log(req.body);
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }
        if (data.length > 0) {
            // Assuming you have a 'user' object in your data
            const user = data[0];
            return res.json({ message: "Login successful", user });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    })
    
})

app.get('/userdata', (req, res) => {
    const sql = "SELECT * from user";

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }

        if (data.length > 0) {
            return res.json({ message: "Data retrieved successfully", data });
        } else {
            return res.status(404).json({ error: "No data found" });
        }
    });
});

app.post('/updateOrder', (req, res) => {
    const { orderId, status } = req.body;
    console.log(req.body);

    const sql = "UPDATE orders SET status = ? WHERE orderId = ?";

    db.query(sql, [status, orderId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }
    });
    const sql2 = "UPDATE tracking SET status = ? WHERE orderId = ?";
    db.query(sql2, [status, orderId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }
        return res.json({ message: "Order updated successfully", result});
    });
});

app.post('/register', (req, res) => {
    const { username, password, usertype, name, phone_number, email_address, address } = req.body;

    const sql = "INSERT INTO user (username, password, usertype, name, phone_number, email_address, address) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [username, password, usertype, name, phone_number, email_address, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }

        return res.json({ message: "Registration successful", result });
    });
});

app.post('/order', async (req, res) => {
    const { name, email, phone, address,itemWeight, packageDimensions, serviceProvider,deliveryDate,originCo,destCo,destination,logo, price, paymentMode, cardNo, zipcode, fromLocation } = req.body;
    console.log(req.body);
    const sql = "INSERT INTO orders (customer, itemWeight, packageDimensions, carrierName, dateOrdered, destination, logo, price, phone_number, email_address, address, payment_method,card_no,zipcode, fromLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    var id;
    db.query(sql, [name, itemWeight, packageDimensions, serviceProvider, deliveryDate, destination, logo, price, phone, email, address, paymentMode, cardNo, zipcode, fromLocation], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error", message: err.message });
      }

      console.log(JSON.stringify(result));
      const id = result.insertId;

      const sql2 = "INSERT INTO tracking (orderId, originLat, originLon, destinationLat, destinationLon, status) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql2, [id, originCo.lat, originCo.lng, destCo.lat, destCo.lng, "Ordered"], (err, trackingResult) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: "Internal Server Error", message: err.message });
          }

          return res.json({ message: "Order successful", orderResult: result, trackingResult });
      });
  });
});


app.get('/orderdata', (req, res) => {
    const sql = "SELECT * from orders";

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }

        if (data.length > 0) {
            return res.json({ message: "Data retrieved successfully", data });
        } else {
            return res.status(404).json({ error: "No data found" });
        }
    });
});

app.get('/serviceProvider', (req, res) => {
    console.log("Service Provider");
    const sql = "SELECT * FROM service_providers";

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }

        if (data.length > 0) {
            return res.json({ message: "Service providers retrieved successfully", data });
        } else {
            return res.json({ message: "No service providers found" });
        }
    });
});

app.get('/trackingData/:orderId', (req, res) => {

  const orderId = req.params.orderId;
    console.log("tracking:",orderId);
  
    const sql = 'SELECT * FROM tracking WHERE orderId = ?';
  
    db.query(sql, [orderId], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }
  
      if (data.length > 0) {
        return res.json({ message: 'Tracking data retrieved successfully', data });
      } else {
        return res.status(404).json({ error: 'No tracking data found' });
      }
    });
  });
// Assuming you have already set up your Express app and connected to the database

// Define a route to handle DELETE requests for deleting a service provider
app.delete('/serviceProviders/:id', (req, res) => {
    const serviceProviderId = req.params.id;
    console.log(serviceProviderId);
  
    // SQL query to delete a service provider based on the provided ID
    const sql = 'DELETE FROM service_providers WHERE id = ?';
  
    // Execute the query
    db.query(sql, [serviceProviderId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }
  
      // Check if any rows were affected by the delete operation
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Service Provider not found' });
      }
  
      return res.json({ message: 'Service Provider deleted successfully' });
    });
  });
  

app.post('/AddserviceProviders', (req, res) => {
    const {
        provider_name,
        email,
        phone_number,
        address,
        shipping_service,
        tracking_service,
        express_delivery_service,
        logo,
        agreement,
        rate
    } = req.body;

    const sql = `
        INSERT INTO service_providers (
            provider_name,
            email,
            phone_number,
            address,
            shipping_service,
            tracking_service,
            express_delivery_service,
            logo,
            agreement,
            rate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        provider_name,
        email,
        phone_number,
        address,
        shipping_service,
        tracking_service,
        express_delivery_service,
        logo,
        agreement,
        rate
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }

        return res.json({ message: "Service provider added successfully", result });
    });
});


app.put('/updateProviders/:id', (req, res) => {
    const serviceProviderId = req.params.id;
    const {
        provider_name,
        email,
        phone_number,
        address,
        shipping_service,
        tracking_service,
        express_delivery_service,
        logo,
        agreement,
        rate,
    } = req.body;
  
    const sql = `
      UPDATE service_providers 
      SET 
        provider_name = ?,
        email = ?,
        phone_number = ?,
        address = ?,
        shipping_service = ?,
        tracking_service = ?,
        express_delivery_service = ?,
        logo = ?,
        agreement =?,
        rate =?
        -- Add other fields here based on your data model
      WHERE id = ?
    `;
  
    db.query(
      sql,
      [provider_name, email, phone_number, address, shipping_service, tracking_service, express_delivery_service, logo, agreement, rate, serviceProviderId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: 'Internal Server Error', message: err.message });
        }
  
        return res.json({
          message: 'Service Provider updated successfully',
          result,
        });
      }
    );
  });

  app.delete('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
  
    const sql = 'DELETE FROM user WHERE id = ?';
  
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found', message: 'No user with the specified ID' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  });
 
  app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email_address, password, usertype, name, phone_number } = req.body;
  
    const sql = `
      UPDATE user
      SET
        username = ?,
        email_address = ?,
        password = ?,
        usertype = ?,
        name = ?,
        phone_number = ?
      WHERE id = ?
    `;
  
    db.query(sql, [username, email_address, password, usertype, name, phone_number, userId], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }
  
      return res.json({ message: 'User updated successfully', result });
    });
  });
  
  

  app.put('/Order/:id', (req, res) => {
    const orderId = req.params.id;
    console.log(orderId);
    const {
      customer,
      itemWeight,
      packageDimensions,
      carrierName,
      dateOrdered,
      destination,
      logo,
      price,
      phone_number,
      email_address,
      address,
      payment_method,
      card_no,
      fromLocation,
      zipcode,
    } = req.body;
  
    const sql = `
      UPDATE orders 
      SET 
        customer = ?,
        itemWeight = ?,
        packageDimensions = ?,
        carrierName = ?,
        dateOrdered = ?,
        destination = ?,
        logo = ?,
        price = ?,
        phone_number = ?,
        email_address = ?,
        address = ?,
        payment_method = ?,
        card_no = ?,
        fromLocation = ?,
        zipcode = ?
        -- Add other fields here based on your data model
      WHERE orderId = ?
    `;
  
    db.query(
      sql,
      [
        customer,
        itemWeight,
        packageDimensions,
        carrierName,
        dateOrdered,
        destination,
        logo,
        price,
        phone_number,
        email_address,
        address,
        payment_method,
        card_no,
        fromLocation,
        zipcode,
        orderId,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: 'Internal Server Error', message: err.message });
        }
  
        return res.json({
          message: 'Order updated successfully',
          result,
        });
      }
    );
  });


  app.delete('/order/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const sq1 = 'DELETE FROM tracking WHERE orderId = ?';
    db.query(sq1, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found', message: 'No user with the specified ID' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
    const sql = 'DELETE FROM orders WHERE orderId = ?';
  
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found', message: 'No user with the specified ID' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  });
 

  // Assuming you have the required modules and database connection

app.get('/user/:username', (req, res) => {
  const username = req.params.username;

  const sql = 'SELECT * FROM user WHERE username = ?';

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'Query executed successfully', result: result[0] });
  });
});

  
// Assuming you have the required modules and database connection
app.get('/orderdata/:username', (req, res) => {
  const username = req.params.username;
  console.log("Comming.....");
  const sql = 'SELECT * FROM orders WHERE customer LIKE ?';

  db.query(sql, [`%${username}%`], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No orders found for the user' });
    }

    return res.json({ message: 'Query executed successfully', result });
  });
});



app.put('/user/:username', (req, res) => {
  const username = req.params.username;
  const updatedUser = req.body;
console.log(username);
console.log(updatedUser);
  const sql = `
    UPDATE user
    SET
      password = ?,
      usertype = ?,
      name = ?,
      phone_number = ?,
      email_address = ?,
      address = ?
      -- Add other fields here based on your data model
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      updatedUser.password,
      updatedUser.usertype,
      updatedUser.name,
      updatedUser.phone_number,
      updatedUser.email_address,
      updatedUser.address,
      username
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }

      return res.json({ message: 'User updated successfully', result });
    }
  );
});



app.listen(8081, () =>{
    console.log("Listening..");
})