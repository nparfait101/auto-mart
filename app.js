import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import appVariables from "./src/config/app.config";
import stringFormater from "./src/middleware/stringFormater";
import userRouter from "./src/routes/user";
import carRouter from "./src/routes/car";
import orderRouter from "./src/routes/order";
import flagRouter from "./src/routes/flag";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(stringFormater);

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.status(301).redirect("/docs");
});

app.use("/api/v2/", userRouter, carRouter, orderRouter, flagRouter);

app.all("/*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "this api endpoint does not exist"
  });
});

/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "oops! something went wrong"
  });
});

const { port } = appVariables || 3000;
/* eslint-disable-next-line */
app.listen(port, () => console.log(`App is running on port: ${port}`));

export default app;
