const Sequelize = require("sequelize");
const { database } = require("../../../config/libs/database");

module.exports.RedisSchema = database.define(
  "redis_info",
  {
    md5: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    host: {
      type: Sequelize.STRING,
    },
    port: {
      type: Sequelize.INTEGER,
      default: 6379,
    },
    password: {
      type: Sequelize.STRING
    },
    add_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { tableName: "redis_monitor" }
);