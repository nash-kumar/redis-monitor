const path = require("path");

/**
 * Export environment variables
 */

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiUrl: process.env.API_URL,
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
    dialect: "sqlite",
    storage: path.join(process.cwd(), "data", "database.sqlite")
  },
}