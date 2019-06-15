import express from "express";
import my_user from "../controllers/users";

const router = express.Router();
router.post("/signup", my_user.createUser);
router.post("/login", my_user.Login);

export default router;
