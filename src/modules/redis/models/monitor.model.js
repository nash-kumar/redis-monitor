const Sequelize = require("sequelize");
const { database } = require("../../../config/libs/database");

const RedisSchema = database.define(
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
      type: Sequelize.STRING,
    },
    add_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { tableName: "redis_monitor" }
);

/**
 * Remove password from response
 */
RedisSchema.prototype.toJSON = function () {
  const data = Object.assign({}, this.get());
  delete data.password;
  return data;
};

module.exports = RedisSchema;
