import express from "express";
import car from "../controllers/Car";

const router = express.Router();

router.post("/", car.create);

export default router;
