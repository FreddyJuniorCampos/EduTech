const joi = require("joi");

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userFirstName = joi.string().min(2).max(80);
const userLastName = joi.string().min(2).max(80);
const userUsername = joi.string().min(2).max(80);
const userEmail = joi.string().min(3).email();
const userPassword = joi.string().min(6);
const userConfirmPassword = joi.string().valid(joi.ref("password"));

const createUserSchema = joi.object({
  username: userUsername.required(),
  firstName: userFirstName.required(),
  lastName: userLastName.required(),
  email: userEmail.required(),
  password: userPassword.required(),
  confirmPassword: userConfirmPassword.required(),
  usertype: joi.string().required(),
});

module.exports = {
  userIdSchema,
  createUserSchema,
};
