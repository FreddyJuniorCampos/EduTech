const joi = require("joi");

const messageSchema = joi.string().max(1000);

const createMessageSchema = joi.object({
  message: messageSchema.required(),
});

module.exports = {
  createMessageSchema,
};
