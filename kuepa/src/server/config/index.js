require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  apiPort: process.env.API_PORT || 3001,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };
