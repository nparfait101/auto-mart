import joi from "joi";
import orders from "../models/order";

// create a order
const createOrder = (req, res) => {
  const data = req.body;

  const schema = joi.object().keys({
    price: joi.string().required(),
    price_offered: joi.string().required()
  });
  const result = joi.validate(data, schema, {
    abortEarly: false
  });
  if (result.error != null) {
    const errors = [];
    for (let index = 0; index < result.error.details.length; index += 1) {
      errors.push(result.error.details[index].message.split('"').join(" "));
    }
    return res.status(422).send({ status: 422, Error: errors });
  }

  const newOrder = {
    id: orders.length + 1,
    name: data.name,
    price: data.price,
    price_offered: data.price_offered
  };
  orders.push(newOrder);
  return res.status(201).send({ status: 201, data: newOrder });
};

// Fetch a specific purchase order.

const getOnlyOne = (req, res) => {
  const order = orders.find(p => p.id === req.params.id);
  if (!order)
    return res
      .status(404)
      .send({ status: 404, Error: "The order with given ID was not found" });
  return res.send({ status: 200, data: order });
};

// Fetch all purchase order records

const getAllOrder = (req, res) =>
  res.send({
    status: 200,
    data: orders
  });

// Edit the name of a specific political party
const editOrderPrice = (req, res) => {
  const order = orders.find(
    eachOrder => eachOrder.id === parseInt(req.params.id, 10)
  );
  if (!order)
    return res.send({
      status: 404,
      Error: "The order with given ID was not found"
    });
  const schema = joi.object().keys({
    price_offered: joi.string().required()
  });
  const result = joi.validate(req.body, schema, {
    abortEarly: false
  });
  if (result.error === null) {
    order.price_offered = req.body.price_offered;
    const updatedData = {
      id: order.id,
      price_offered: order.price_offered
    };
    return res.send({ status: 200, data: [updatedData] });
  }
  const errors = [];
  for (let index = 0; index < result.error.details.length; index += 1) {
    errors.push(result.error.details[index].message.split('"').join(" "));
  }
  return res.status(422).send({ status: 422, Error: errors });
};

// Delete a specific purchase order.
const deleteOrder = (req, res) => {
  const order = orders.find(
    eachOrder => eachOrder.id === parseInt(req.params.id, 10)
  );
  if (!order)
    return res.send({
      status: 404,
      Error: "The order with given ID was not found"
    });
  const index = orders.indexOf(order);
  orders.splice(index, 1);
  return res.send({ status: 200, data: order });
};

export { createOrder, getAllOrder, getOnlyOne, editOrderPrice, deleteOrder };
