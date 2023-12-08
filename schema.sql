USE HospitalManagementSystem;

CREATE TABLE IF NOT EXISTS superAdmin (superAdmin_id   INT PRIMARY KEY AUTO_INCREMENT,`email` varchar(255), `password` varchar(255));

CREATE TABLE IF NOT EXISTS admin (
    admin_id   INT PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(255),
    phone_no varchar(50),
    designation varchar(100),
    password varchar(255),
    address varchar(255),
    salary int
);

CREATE TABLE IF NOT EXISTS doctors (
  doctor_id   INT PRIMARY KEY AUTO_INCREMENT,
  first_name      VARCHAR(255),
  last_name       VARCHAR(255),
  address         VARCHAR(255),
  email           VARCHAR(255),
  salary          INT,
  specialisation  VARCHAR(255),
  shift_time      VARCHAR(255),
  password        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
  user_id   INT PRIMARY KEY AUTO_INCREMENT,
  first_name  VARCHAR(255),
  last_name   VARCHAR(255),
  email       VARCHAR(255),
  password    VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS patient (
  patient_id   INT PRIMARY KEY AUTO_INCREMENT, -- Added patient_id as INT with PRIMARY KEY and AUTO_INCREMENT
  first_name  VARCHAR(255),
  last_name   VARCHAR(255),
  address     VARCHAR(255),
  email       VARCHAR(255),
  phone_no    VARCHAR(255),
  password    VARCHAR(255),
  disease     VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS assign_doctor (
    patient_id INT,
    doctor_id INT
);

CREATE TABLE bill(
  patient_id INT,
  patient_email VARCHAR(255),
  medicine_cost INT,
  room_charge INT,
  misc_charge INT,
  operation_charge DECIMAL(10,2)
);