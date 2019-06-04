import Joi from "joi";

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      firstname: Joi.string()
        .min(2)
        .max(18)
        .required(),
      lastname: Joi.string()
        .min(2)
        .max(18)
        .required(),
      password: Joi.string()
        .min(5)
        .max(14)
        .required(),
      address: Joi.string()
        .min(4)
        .max(20)
        .required(),
      isAdmin: Joi.boolean()
    })
  }
};
