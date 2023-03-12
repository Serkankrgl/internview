const Joi = require("joi");

const createValidation = Joi.object({
  full_name: Joi.string().required().min(5),
  email: Joi.string().required().min(5).email(),
  password: Joi.string().required(),
});

const loginValidation = Joi.object({
  email: Joi.string().required().min(5).email(),
  password: Joi.string().required(),
});

module.exports = {
  createValidation,
  loginValidation,
};
