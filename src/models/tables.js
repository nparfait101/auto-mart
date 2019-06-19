import pool from "./db";

const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,
       email VARCHAR(50) UNIQUE NOT NULL,
       "firstName" VARCHAR(24) NOT NULL,
       "lastName" VARCHAR(10) NOT NULL,
       password VARCHAR(80) NOT NULL,
       address VARCHAR(50) NOT NULL,
       "isAdmin" BOOLEAN NOT NULL DEFAULT false
     )`;
  const cars = `CREATE TABLE IF NOT EXISTS
    cars(
     id SERIAL PRIMARY KEY,
     owner INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "firstName",
    "lastName",
    password,
    address,
    "isAdmin"
    ) VALUES (
    'parfait123@gmail.com',
    'ntagungira',
    'parfait',
    '12345',
    'KIMIRONKO',
    true
    )`;
  const queries = `${users};${cars};${orders};${flags};${newUserTable}`;
  pool.query(queries);
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
  const cars = "DROP TABLE IF EXISTS loans CASCADE";
  const orders = "DROP TABLE IF EXISTS orders";
  const deleteQueries = `${users};${cars}; ${orders}`;
  pool.query(deleteQueries);
};

module.exports = {
  tablesCreate,
  tablesDelete
};

require("make-runnable");
