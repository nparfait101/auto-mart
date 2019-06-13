import express from "express";
import car from "../controllers/car";

const router = express.Router();
router.post("/", car.create);
router.get("/", car.getCars);
router.get("/:id", car.getOne);

export default router;
