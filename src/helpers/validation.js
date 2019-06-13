import Joi from "joi";

class Helper {
  // check if it is valid User

  static isUserValid(user) {
    const schema = {
      firstname: Joi.string()
        .min(2)
        .required()
        .trim(),
      lastname: Joi.string()
        .min(2)
        .required()
        .trim(),
      email: Joi.string()
        .email()
        .min(5)
        .required()
        .trim(),
      password: Joi.string()
        .min(5)
        .required()
        .trim(),
      address: Joi.string()
        .min(2)
        .required()
        .trim(),
      isAdmin: Joi.boolean().default(false)
    };
    return Joi.validate(user, schema);
  }
}

export default Helper;
