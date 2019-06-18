const {Pool}= require("pg");
const dotenv= require("dotenv");

dotenv.config();

const pool = new Pool({
connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
console.log('connected to the db');
});

//Create users table
const create_users_table=()=>{
   const users_table= `CREATE TABLE IF NOT EXISTS
users(
   id SERIAL,
   email varchar(255) NOT NULL,
   first_name varchar(255) NOT NULL,
   last_name varchar(255) NOT NULL,
   password varchar(255) NOT NULL,
   address varchar(255) NOT NULL,
   PRIMARY KEY (id)
)`;
pool.query(users_table)
.then((res)=>{
   console.log(res);
   pool.end();
})
.catch((err)=>{
   console.log(err);
   pool.end();
});
};

//Create sales table
const create_sales_table=()=>{
   const sales_table= `CREATE TABLE IF NOT EXISTS
sales(
   id SERIAL,
   owner_id int NOT NULL,
   buyer_id int NOT NULL,
   created_on DATE NOT NULL,
   state varchar(255) NOT NULL,
   status varchar(255) NOT NULL,
   price int NOT NULL,
   manufacturer varchar(255) NOT NULL,
   model varchar(255) NOT NULL,
   body_type varchar(255) NOT NULL,
   flagged BOOLEAN,
   PRIMARY KEY (id),
   FOREIGN KEY (owner_id) REFERENCES users(id),
   FOREIGN KEY (buyer_id) REFERENCES users(id)
)`;
pool.query(sales_table)
.then((res)=>{
   console.log(res);
   pool.end();
})
.catch((err)=>{
   console.log(err);
   pool.end();
});
};

//Create orders table
const create_orders_table=()=>{
   const orders_table= `CREATE TABLE IF NOT EXISTS
orders(
   id SERIAL,
   buyer_id int NOT NULL,
   owner_id int NOT NULL,
   car_id int NOT NULL,
   created_on DATE NOT NULL,
   amount int NOT NULL,
   status varchar(255) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (owner_id) REFERENCES users(id),
   FOREIGN KEY (buyer_id) REFERENCES users(id),
   FOREIGN KEY (car_id) REFERENCES sales(id)
)`;
pool.query(orders_table)
.then((res)=>{
   console.log(res);
   pool.end();
})
.catch((err)=>{
   console.log(err);
   pool.end();
});
};

//Create reports table
const create_reports_table=()=>{
   const reports_table= `CREATE TABLE IF NOT EXISTS
reports(
   id SERIAL,
   car_id int NOT NULL,
   buyer_id int NOT NULL,
   owner_id int NOT NULL,
   created_on DATE NOT NULL,
   reason varchar(255) NOT NULL,
   description varchar(255) NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (owner_id) REFERENCES users(id),
   FOREIGN KEY (buyer_id) REFERENCES users(id),
   FOREIGN KEY (car_id) REFERENCES sales(id)
)`;
pool.query(reports_table)
.then((res)=>{
   console.log(res);
   pool.end();
})
.catch((err)=>{
   console.log(err);
   pool.end();
});
};

export const createAlltables=()=>{
   create_users_table();
   create_sales_table();
   create_orders_table();
   create_reports_table()
};

require('make-runnable');