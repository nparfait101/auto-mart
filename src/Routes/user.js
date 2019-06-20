import express from "express";
import {
  signupUser,
  loginUser,
  sendResetPasswordLink,
  resetPassword
} from "../controllers/user";
import {
  validateSignup,
  validateSignin,
  validateEmail,
  confirmPassword
} from "../middleware/validators/user";

const router = express.Router();

router.post("/auth/signup", validateSignup, signupUser);
router.post("/auth/signin", validateSignin, loginUser);
router.post("/auth/reset-password", validateEmail, sendResetPasswordLink);
router.patch("/auth/reset-password/:token", confirmPassword, resetPassword);

export default router;
