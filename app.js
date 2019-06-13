import express from "express";
import bodyParser from "body-parser";

import car from "./src/Routes/car";
import orderRoutes from "./src/Routes/orderRoutes";
import users from "./src/Routes/users";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use("/api/v1/cars", car);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", users);

export default app;
