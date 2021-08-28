const express = require("express");
const app = express();

const { config } = require("./config");
const register = require("./routes/register");

// Body-parser
app.use(express.json());

// routes
register(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
