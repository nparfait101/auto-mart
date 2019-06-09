import express from "express";
import {
  createOrder,
  getAllOrder,
  getOnlyOne,
  editOrderPrice,
  deleteOrder
} from "../controllers/orderController";

const router = express.Router();
router.post("/", createOrder);
router.get("/", getAllOrder);
router.get("/:id", getOnlyOne);
router.patch("/:id/price", editOrderPrice);
router.delete("/:id", deleteOrder);

export default router;
