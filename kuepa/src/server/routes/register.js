const express = require("express");
const RegisterService = require("../services/register");

const { userIdSchema, createUserSchema } = require("../utils/schema/user");
const validationHandler = require("../utils/middleware/validationHandler");

function register(app) {
  const router = express.Router();
  app.use("/register", router);

  const registerService = new RegisterService();

  // Routes
  router.post("/", validationHandler(createUserSchema), createUser);
  router.delete(
    "/:movieId",
    validationHandler({ userId: userIdSchema }),
    deleteUser
  );

  // Functions
  async function createUser(req, res, next) {
    const { body: data } = req;
    try {
      const createdUserId = await registerService.createUser({ data });

      res.status(201).json({
        data: createdUserId,
        message: "user created",
      });
    } catch (err) {
      next(err);
    }
  }

  async function deleteUser(req, res, next) {
    const { userId } = req.params;
    try {
      const deletedUser = await registerService.deleteUser({ userId });

      res.status(200).json({
        data: deletedUser,
        message: "user deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = register;
