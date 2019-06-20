import express from "express";
import { verifyToken } from "../middleware/jwtAuth";
import upload from "../config/multer.config";

import {
  validatePostCar,
  validatePatchStatus,
  validatePatchPrice,
  validateIdParam,
  validateQueries
} from "../middleware/validators/car";
import {
  postCarAd,
  updateStatus,
  updatePrice,
  getSpecificCar,
  getCars,
  deleteAd
} from "../controllers/car";

const router = express.Router();

router.post(
  "/car",
  verifyToken,

  verifyToken,
  validatePostCar,

  postCarAd
);

router.get("/car", validateQueries, getCars);
router.patch(
  "/car/:carId/status",
  verifyToken,
  validatePatchStatus,
  updateStatus
);
router.patch("/car/:carId/price", verifyToken, validatePatchPrice, updatePrice);
router.get("/car/:carId", validateIdParam, getSpecificCar);
router.delete("/car/:carId", verifyToken, validateIdParam, deleteAd);

export default router;
