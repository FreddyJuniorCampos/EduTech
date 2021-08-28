const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const RegisterService = require("../../../services/register");
const { config } = require("../../../config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const registerService = new RegisterService();

      try {
        const user = await registerService.getOne({
          username: tokenPayload.username,
        });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
