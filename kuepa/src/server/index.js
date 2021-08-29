const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("./config");
const authRouter = require("./routes/auth");
const messagesApi = require("./routes/chat");
const register = require("./routes/register");

// Cors
const corsOptions = { origin: "*", credentials: true };
app.use(cors(corsOptions));

// Body-parser
app.use(express.json());

// routes
register(app);
messagesApi(app);
authRouter(app);

app.listen(config.apiPort, () => {
  console.log(`Listening http://localhost:${config.apiPort}`);
});
