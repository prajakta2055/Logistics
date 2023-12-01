create database Logistic;

use Logistic;

create table user (username varchar(255), password varchar(255), usertype varchar(255));

INSERT INTO user (username, password, usertype) VALUES
  ('user1', 'pass123', 'admin'),
  ('user2', 'pass456', 'customer'),
  ('user3', 'pass789', 'customer'),
  ('user4', 'passabc', 'admin'),
  ('user5', 'passdef', 'customer');
  
ALTER TABLE user
ADD COLUMN name VARCHAR(255),
ADD COLUMN phone_number VARCHAR(15),
ADD COLUMN email_address VARCHAR(255),
ADD COLUMN address VARCHAR(255);

describe user;

-- Add an 'id' column to the existing 'user' table
ALTER TABLE user
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST;
  
CREATE TABLE service_providers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    provider_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    address TEXT,
    shipping_service BOOLEAN,
    tracking_service BOOLEAN,
    express_delivery_service BOOLEAN,
    logo VARCHAR(255),
    agreement VARCHAR(255)
);
ALTER TABLE service_providers
ADD COLUMN rate DECIMAL(10, 2);
select * from service_providers;

select * from user;
select * from orders;


CREATE TABLE orders (
    orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer VARCHAR(255),
    itemWeight VARCHAR(255),
    packageDimensions VARCHAR(255),
    carrierName VARCHAR(255),
    dateOrdered VARCHAR(255),
    destination VARCHAR(255),
    logo VARCHAR(255),
    price VARCHAR(255),
    phone_number VARCHAR(15),
    email_address VARCHAR(255),
    address VARCHAR(255),
    payment_method VARCHAR(255),
    card_no VARCHAR(255),
    zipcode VARCHAR(255),
    fromLocation VARCHAR(255),
	status varchar(50) default "Ordered"
);

CREATE TABLE tracking (
  orderId INT,
  originLat VARCHAR(50),
  originLon VARCHAR(50),
  destinationLat VARCHAR(50),
  destinationLon VARCHAR(50),
  status varchar(50),
  FOREIGN KEY (orderId) REFERENCES orders(orderId)
);

select * from orders;



ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Oneplus@6';

Flush privileges;