// Imports
const { celebrate, Joi, Segments } = require("celebrate");

// Validations
const validateCredential = celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    hash: Joi.string().required(),
  }),
});

// Export
module.exports = {
  validateCredential,
};
