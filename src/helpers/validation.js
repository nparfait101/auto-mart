import Joi from "joi";

export const validateUser = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    firstName: Joi.string()
      .min(1)
      .required()
      .regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/),
    lastName: Joi.string()
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
    isAdmin: Joi.string()
  };
  const { error } = Joi.validate(data, schema);
  return error;
};
