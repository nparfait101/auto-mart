import express from "express";
<<<<<<< HEAD:app.js
import router from "./src/Routes/car";
=======
import Joi from "joi";
// import car from "./Routes/car";
import router from "./Routes/orderRoutes";
>>>>>>> ft-purchase-order-166494139:src/app.js

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use("/api/v1/users", router);
app.use("/api/v1/cars", router);
app.use("/api/v1/orders", router);

export default app;
