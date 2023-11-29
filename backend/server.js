const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Oneplus@6",
    database: "Logistic"
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

app.post('/order', (req, res) => {
    const { name, email, phone, address,itemWeight, packageDimensions, serviceProvider,deliveryDate,destination,logo, price, paymentMode, cardNo } = req.body;
console.log(req.body);
    const sql = "INSERT INTO orders (customer, itemWeight, packageDimensions, carrierName, dateOrdered, destination, logo, price, phone_number, email_address, address, payment_method,card_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [name, itemWeight, packageDimensions, serviceProvider,deliveryDate,destination,logo,price, phone, email,address,paymentMode,cardNo], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", message: err.message });
        }

        return res.json({ message: "Order successful", result });
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





app.listen(8081, () =>{
    console.log("Listening..");
})