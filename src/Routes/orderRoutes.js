import express from "express";
import auth from "../helpers/auth";
import {
  createOrder,
  getAllOrder,
  getOnlyOne,
  editOrderPrice,
  deleteOrder
} from "../controllers/orderController";

const router = express.Router();
router.post("/", auth, createOrder);
router.get("/", getAllOrder);
router.get("/:id", getOnlyOne);
router.put("/:id", auth, editOrderPrice);
router.delete("/:id", auth, deleteOrder);

export default router;
