import pool from "./db";

const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       email VARCHAR(50) UNIQUE NOT NULL,
       firstname VARCHAR(24) NOT NULL,
       lastname VARCHAR(10) NOT NULL,
       password VARCHAR(80) NOT NULL,
       address VARCHAR(50) NOT NULL,
       isadmin BOOLEAN NOT NULL DEFAULT false
     )`;
  const cars = `CREATE TABLE IF NOT EXISTS
    cars(
     id SERIAL PRIMARY KEY,
     email VARCHAR(50) NOT NULL
     manufacturer VARCHAR(50) NOT NULL,
     model VARCHAR(50) NOT NULL,
     price FLOAT NOT NULL,
     state VARCHAR(50) NOT NULL,
     status VARCHAR(50) NOT NULL  
    )`;
  const orders = `CREATE TABLE IF NOT EXISTS
   orders(
     id SERIAL PRIMARY KEY,
     buyer INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     car_id INT NOT NULL REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE,
     amount FLOAT NOT NULL,
     status VARCHAR(50) NOT NULL
   )`;
  const flags = `CREATE TABLE IF NOT EXISTS
   flags(
     id SERIAL PRIMARY KEY,
     car_id INT NOT NULL REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE,
     "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     reason VARCHAR(50) NOT NULL,
     description VARCHAR(70) NOT NULL
   )`;
  const newUserTable = `INSERT INTO
  users(
    email,
    firstname,
    lastname,
    password,
    address,
    isadmin
    ) VALUES (
    'parfait123@gmail.com',
    'ntagungira',
    'parfait',
    '12345',
    'KIMIRONKO',
    true
    )`;

  const newCarTable = `INSERT INTO
  cars(
    email,
    manufacturer,
    model,
    price,
    state,
    status
    ) VALUES (
    'parfait101@gmail.com',
    'honda',
    'civic',
    '12300',
    'new',
    'Available'
    )`;
  const queries = `${users};${cars};${orders};${flags};${newUserTable};${newCarTable}`;
  pool.query(queries);
  console.log("tables created successfully");
  pool
    .query(queries)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });

  pool.on("remove", () => {
    console.log("client removed");
    process.exit(0);
  });
};

const tablesDelete = () => {
  const users = "DROP TABLE IF EXISTS users CASCADE";
  const cars = "DROP TABLE IF EXISTS cars CASCADE";
  const orders = "DROP TABLE IF EXISTS orders";
  const deleteQueries = `${users};${cars}; ${orders}`;
  pool.query(deleteQueries);
  console.log("tables deleted successfully");
};

tablesDelete();
tablesCreate();
require("make-runnable");
