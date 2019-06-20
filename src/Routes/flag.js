import express from "express";
import flagAd from "../controllers/flag";
import { verifyToken } from "../middleware/jwtAuth";
import validateFlag from "../middleware/validators/flag";

const router = express.Router();

router.post("/flag", verifyToken, validateFlag, flagAd);

export default router;
