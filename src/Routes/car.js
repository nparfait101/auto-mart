import express from "express";
import car from "../controllers/car";

const router = express.Router();
router.post("/", car.create);

export default router;
