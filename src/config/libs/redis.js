const redis = require("redis");
const moment = require("moment");

/**
 * Create Redis Client
 * @param {*} host
 * @param {*} port
 * @param {*} password : password if any
 */
module.exports.createRedis = async (host, port, password) => {
  return new Promise((resolve, reject) => {
    let client = redis.createClient({ host, port, password });

    client.on("error", (error) => {
      console.log("error in redis connection");
      client.quit();
      reject(error);
    });

    client.on("ready", () => {
      console.log("redis server is connected successfully.");
      resolve(client);
      client.quit();
    });
  });
};

module.exports.ping = async (info) => {
  try {
    if (info.password === "") info.password = undefined;
    let client = await this.createRedis(info.host, info.port, info.password);
    client.info();
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports.get_info = async (info) => {
  try {
    if (info.password == null) info.password = undefined;
    let start = moment.now();
    let client = await this.createRedis(info.host, info.port, info.password);
    let serverDetails = client.server_info;
    let end = moment.now();
    serverDetails["get_time"] = end - start;
    return serverDetails;
  } catch (err) {
    return err;
  }
};

module.exports.flushall = async (info) => {
  try {
    if (info.password == null) info.password = undefined;
    let client = redis.createClient(info);
    return client.flushdb();
  } catch (err) {
    return err;
  }
};
