import express from "express";
import car from "../controllers/Car";

const router = express.Router();

router.post("/", car.create);
router.get("/", car.getAll);
router.get("/:id", car.getOne);
router.put("/:id", car.update);

export default router;
