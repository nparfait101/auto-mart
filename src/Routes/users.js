import express from "express";
import User from "../controllers/users";

const router = express.Router();
router.post("/signup", User.createUser);
router.post("/login", User.Login);

export default router;
