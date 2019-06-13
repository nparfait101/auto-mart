import express from "express";
import car from "../controllers/car";
import auth from "../helpers/auth";

const router = express.Router();
router.post("/", auth, car.create);
router.get("/", car.getCars);
router.get("/:id", car.getOne);

export default router;
