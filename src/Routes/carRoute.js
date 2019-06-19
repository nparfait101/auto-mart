import express from "express";
import Car from "../controllers/carController";
import userAuth from "../helpers/auth";

const router = express.Router();

router.post("/", Car.createCar);
// router.get("/", userAuth.isAuth, userAuth.adminAccess, Loan.getAll);
// router.get("/:id", userAuth.isAuth, userAuth.adminAccess, Loan.getOne);
// router.patch("/:id", userAuth.isAuth, userAuth.adminAccess, Loan.updateLoan);
// router.get("/", Loan.geCurrent);

export default router;
