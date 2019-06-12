import express from "express";
import Joi from "joi";
import router from "./Routes/orderRoutes";

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
