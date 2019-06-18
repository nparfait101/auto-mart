import express from "express";
import UserController from "../controllers/users";

const router = express.Router();
router.post("/auth/signup", UserController.registerNewUser);
router.post("/auth/login", UserController.loginUser);

export default router;
