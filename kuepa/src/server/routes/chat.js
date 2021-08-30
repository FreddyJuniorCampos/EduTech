const express = require("express");
const passport = require("passport");
const MessageService = require("../services/messages");

const { createMessageSchema } = require("../utils/schema/messages");
const validationHandler = require("../utils/middleware/validationHandler");

// JWT strategy
require("../utils/auth/strategies/jwt");

function messagesApi(app) {
  const router = express.Router();
  app.use("/api/messages", router);

  const messageService = new MessageService();

  // Routes
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    getMessages
  );
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validationHandler(createMessageSchema),
    createMessage
  );

  // Functions
  async function getMessages(req, res, next) {
    try {
      const messages = await messageService.getMessages();

      res.status(200).json({
        data: messages,
        message: "messages listed",
      });
    } catch (err) {
      next(err);
    }
  }

  async function createMessage(req, res, next) {
    const { body, user } = req;
    const { username, usertype } = user;
    const { message } = body;
    const createdAt = new Date(Date.now());
    const data = { username, usertype, message, createdAt };
    try {
      const createdMessageId = await messageService.createMessage({ data });

      res.status(201).json({
        data: createdMessageId,
        message: "message created",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = messagesApi;
