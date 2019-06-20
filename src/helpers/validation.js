import Joi from "joi";
import { isBoolean } from "util";

export const validateUser = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    firstname: Joi.string()
      .min(1)
      .required()
      .regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    lastname: Joi.string()
      .min(2)
      .required()
      .regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    address: Joi.string()
      .min(3)
      .required()
      .trim(),
    password: Joi.string()
      .min(3)
      .required()
      .regex(/^[a-zA-Z0-9]{6,30}$/),
    isadmin: Joi.string()
  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateLogin = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .required()
      .trim()
  };
  const { error } = Joi.validate(data, schema);
  return error;
};

export const validateCar = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    manufacturer: Joi.string()
      .min(1)
      .required()
      .regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    model: Joi.string()
      .min(2)
      .required()
      .regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    price: Joi.string()
      .min(2)
      .required()
      .trim(),
    state: Joi.string()
      .min(2)
      .required()
      .trim(),
    status: Joi.string()
      .min(3)
      .required()
      .trim()
    // isadmin: Joi.string().required()
  };
  const { error } = Joi.validate(data, schema);
  return error;
};
