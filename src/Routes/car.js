import express from "express";
import auth from "../helpers/auth";
import {
  createCar,
  getAllCar,
  getOnlyOne,
  editCarPrice,
  deleteCar
} from "../controllers/car";

const router = express.Router();
router.post("/", auth, createCar);
router.get("/", getAllCar);
router.get("/:id", getOnlyOne);
router.put("/:id", auth, editCarPrice);
router.delete("/:id", auth, deleteCar);

export default router;
