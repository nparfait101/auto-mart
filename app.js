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
app.use("/api/v1", users);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to Auto-mart apps!"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Auto-mart apps is running on port ${port} ...`)
);

export default app;
