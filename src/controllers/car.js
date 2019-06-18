import joi from "joi";
import Car from "../models/car";
import moment from "moment";

// create a car
const createCar = (req, res) => {
  const data = req.body;

  const schema = joi.object().keys({
    email: joi.string().required(),
    manufacturer: joi.string().required(),
    model: joi.string().required(),
    price: joi.string().required(),
    state: joi.string().required(),
    status: joi.string().required()
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

  const newCar = {
    id: Car.length + 1,
    email: data.email,
    created_on: moment(Date.now()),
    manufacturer: data.manufacturer,
    model: data.model,
    price: data.price,
    state: data.state,
    status: data.status
  };
  Car.push(newCar);
  return res.status(201).send({ status: 201, data: newCar });
};

// Fetch a specific Car.

const getOnlyOne = (req, res) => {
  const car = Car.find(p => p.id === req.params.id);
  if (!car)
    return res
      .status(404)
      .send({ status: 404, Error: "The car with given ID was not found" });
  return res.send({ status: 200, data: car });
};

// Fetch all car records

const getAllCar = (req, res) =>
  res.send({
    status: 200,
    data: Car
  });

// Edit the name of a specific car
const editCarPrice = (req, res) => {
  const car = Car.find(p => p.id === req.params.id);
  if (!car)
    return res.send({
      status: 404,
      Error: "The car with given ID was not found"
    });
  const schema = joi.object().keys({
    price: joi.string().required()
  });
  const result = joi.validate(req.body, schema, {
    abortEarly: false
  });
  if (result.error === null) {
    car.price = req.body.price;
    const updatedData = {
      id: car.id,
      price: car.price
    };
    return res.send({ status: 200, data: [updatedData] });
  }
  const errors = [];
  for (let index = 0; index < result.error.details.length; index += 1) {
    errors.push(result.error.details[index].message.split('"').join(" "));
  }
  return res.status(422).send({ status: 422, Error: errors });
};

// Delete a specific car.
const deleteCar = (req, res) => {
  const car = Car.find(eachCar => eachCar.id === parseInt(req.params.id, 10));
  if (!car)
    return res.send({
      status: 404,
      Error: "The car with given ID was not found"
    });
  const index = Car.indexOf(car);
  Car.splice(index, 1);
  return res.send({ status: 200, data: car });
};

export { createCar, getAllCar, getOnlyOne, editCarPrice, deleteCar };
