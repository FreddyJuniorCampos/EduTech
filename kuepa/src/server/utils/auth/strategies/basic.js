const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersService = require("../../../services/register");

passport.use(
  new BasicStrategy(async function (username, password, cb) {
    const userService = new UsersService();

    try {
      const user = await userService.getOne({ username });
      if (!user) {
        return cb(boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
