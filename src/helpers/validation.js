import Joi from "joi";

class Helper {
  // check if it is valid User

  static isUserValid(user) {
    const schema = {
      first_name: Joi.string()
        .min(2)
        .required()
        .trim(),
      last_name: Joi.string()
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
      is_admin: Joi.boolean().default(true)
    };
    return Joi.validate(user, schema);
  }
}

export default Helper;
