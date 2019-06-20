import { orderQueries, carQueries } from "../models/db/queries";
import errorMessage from "../helpers/responseMessages";

export const createOrder = async (req, res) => {
  const { carId, offer, userId: buyer } = req.body;
  try {
    const car = await carQueries.findCarById(carId);
    if (!car) return errorMessage(res, 404, "Car does not exist");
    const newOrder = await orderQueries.createOrder(
      buyer,
      carId,
      offer,
      car.price
    );
    return res.status(201).json({
      status: 201,
      data: newOrder
    });
  } catch (error) {
    errorMessage(res, 500, "oops! something went wrong");
  }
};

export const updateOrder = async (req, res) => {
  const { newOffer, userId: buyerId } = req.body;
  const { orderId } = req.params;
  try {
    const oldOrder = await orderQueries.findOrderById(+orderId);
    if (!oldOrder || oldOrder.buyer_id !== buyerId) {
      return errorMessage(res, 404, "Purchase order not found");
    }
    const updatedOrder = await orderQueries.updateOffer(+orderId, newOffer);
    return res.status(200).json({
      status: "success",
      data: {
        ...updatedOrder,
        oldOffer: oldOrder.offer
      }
    });
  } catch (error) {
    errorMessage(res, 500, "oops! something went wrong");
  }
};
