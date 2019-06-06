import express from "express";
import router from "./src/Routes/car";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use("/api/v1/users", router);
app.use("/api/v1/cars", router);

export default app;
