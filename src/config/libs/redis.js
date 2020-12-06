const redis = require("redis");

/**
 * Initialize Redis Client
 * @param {String} host
 * @param {Number} port
 * @param {String} auth_pass : password if any
 */
module.exports.createRedis = async (host, port, auth_pass) => {
  return new Promise((resolve, reject) => {
    let client = redis.createClient({ host, port, auth_pass });

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

/**
 * Check if client is connected
 *
 * @param {Object} info redis redis host, port, password parameters
 * @return {Object} success resp
 */
module.exports.ping = async (info) => {
  try {
    let client = await this.createRedis(info.host, info.port, info.password);
    client.info();
    
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

/**
 * Get Redis information
 * @param {Object} info redis redis host, port, password parameters
 * @return {Object} redis server details
 */
module.exports.get_info = async (info) => {
  try {
    let start = new Date();

    let client = await this.createRedis(info.host, info.port, info.password);
    let serverDetails = client.server_info;

    let end = new Date();

    serverDetails["get_time"] = end - start;
    return serverDetails;
  } catch (err) {
    return err;
  }
};

/**
 * Create Redis Client
 * @param {Object} info redis host, port, password, db parameters
 * @return {Object} success resp
 */
module.exports.flushall = async (info) => {
  try {
    let client = redis.createClient(info);
    return client.flushdb();
  } catch (err) {
    return err;
  }
};
