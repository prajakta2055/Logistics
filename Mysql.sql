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
INSERT INTO locations (location_id, name, latitude, longitude)
VALUES
  (1, 'Millennium Park', 41.8825, -87.6237),
  (2, 'Navy Pier', 41.8917, -87.6086),
  (3, 'Art Institute of Chicago', 41.8796, -87.6237),
  (4, 'The Field Museum', 41.8663, -87.6163),
  (5, 'Willis Tower', 41.8789, -87.6359),
  (6, 'Magnificent Mile', 41.8950, -87.6247),
  (7, 'Grant Park', 41.8786, -87.6205),
  (8, 'Shedd Aquarium', 41.8676, -87.6140),
  (9, 'Wrigley Field', 41.9484, -87.6553),
  (10, 'Lincoln Park Zoo', 41.9203, -87.6333),
  (11, 'Chicago Riverwalk', 41.8889, -87.6265),
  (12, 'Museum of Science and Industry', 41.7918, -87.5839),
  (13, 'Buckingham Fountain', 41.8758, -87.6189),
  (14, 'Cloud Gate (The Bean)', 41.8827, -87.6233),
  (15, 'John Hancock Center', 41.8986, -87.6215),
  (16, 'Adler Planetarium', 41.8663, -87.6068),
  (17, 'Chicago Theatre', 41.8856, -87.6275),
  (18, 'Windy City Pizza', 41.9014, -87.6315),
  (19, 'Lincoln Park Conservatory', 41.9231, -87.6324),
  (20, 'The Robey Hotel', 41.9055, -87.6784),
  (21, 'Chicago Botanic Garden', 42.1500, -87.7900),
  (22, 'Garfield Park Conservatory', 41.8840, -87.7175),
  (23, 'Union Station', 41.8787, -87.6389),
  (24, 'Montrose Beach', 41.9656, -87.6384),
  (25, 'Adams/Wabash L Station', 41.8796, -87.6265),
  (26, 'Gino\'s East', 41.8986, -87.6256),
  (27, 'The Drake Hotel', 41.9006, -87.6265),
  (28, 'Maggie Daley Park', 41.8813, -87.6191),
  (29, 'Gibsons Bar & Steakhouse', 41.9110, -87.6315),
  (30, 'The Second City', 41.9115, -87.6346),
  (31, 'Chicago History Museum', 41.9110, -87.6315),
  (32, 'Oak Street Beach', 41.9031, -87.6239),
  (33, 'The Magnificent Mile (North End)', 41.8950, -87.6247),
  (34, 'Chicago Cultural Center', 41.8841, -87.6247),
  (35, 'Peggy Notebaert Nature Museum', 41.9273, -87.6374),
  (36, 'North Avenue Beach', 41.9124, -87.6270),
  (37, 'Oriental Institute Museum', 41.7899, -87.5987),
  (38, 'Chicago Public Library - Harold Washington Library Center', 41.8765, -87.6280),
  (39, 'The Gwen Hotel', 41.8930, -87.6314),
  (40, 'Chicago Symphony Center', 41.8782, -87.6254);

CREATE TABLE locations (
  location_id INT PRIMARY KEY,
  name VARCHAR(255),
  latitude DOUBLE,
  longitude DOUBLE
);


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
    agreement VARCHAR(255),
    rate DECIMAL(10, 2)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Oneplus@6';

Flush privileges;
