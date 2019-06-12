import express from "express";
import bodyParser from "body-parser";

import car from "./src/Routes/car";
import orderRoutes from "./src/Routes/orderRoutes";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use("/api/v1/cars", car);
app.use("/api/v1/orders", orderRoutes);

export default app;
