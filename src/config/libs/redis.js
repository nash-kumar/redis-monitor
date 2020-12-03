const redis = require("redis");

module.exports.createRedis = async (host, port, password, db) => {
  return new Promise((resolve, reject) => {
    let client = redis.createClient({ host, port, password, db });

    client.on("error", (error) => {
      console.log("error in redis connection");
      reject(error);
    });

    client.on("ready", () => {
      console.log("redis server is connected successfully.");
      resolve(client);
    });
  });
};

module.exports.ping = async (info) => {
  try {
    let client = await this.createRedis(info.host, info.port, info.password);
    client.info();
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports.get_info = async (info) => {
  try {
    this.ping();
  } catch (err) {}
};

module.exports.flush = async (info) => {
  try {
  } catch (err) {}
};
