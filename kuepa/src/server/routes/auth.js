const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

const { config } = require("../config");

// Basic strategy
require("../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/auth", router);

  router.post("/login", async function (req, res, next) {
    passport.authenticate("basic", function (error, user) {
      try {
        if (error || !user) {
          const { statusCode, payload } = error.output;
          return res.status(statusCode).json({ payload });
        }

        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { _id: id, username, email } = user;

          const payload = {
            sub: id,
            username,
            email,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: "1440m",
          });

          return res.status(200).json({ token, user: { id, username, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });
}

module.exports = authApi;
