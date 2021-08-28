const express = require("express");
const app = express();
const { config } = require("./config");
const authRouter = require("./routes/auth");
const messagesApi = require("./routes/chat");
const register = require("./routes/register");

// Body-parser
app.use(express.json());

// routes
register(app);
messagesApi(app);
authRouter(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
