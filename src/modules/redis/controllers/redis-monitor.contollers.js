const RedisMonitorModel = require("../models/redis-monitor.model");
const RedisMonitor = require("../../../config/libs/redis");

/**
 * Load redis info and append to req.
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {Function} next handler
 */
exports.load = async (req, res, next, md5) => {
  try {
    const info = await RedisMonitorModel.findOne({ where: { md5 } });
    if (!info) {
      throw new Error("Data not found");
    }
    req.locals = { info };
    return next();
  } catch (e) {
    return next(e);
  }
};

/**
 * Get list of redis info
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {Array} List of Redis info object
 */

exports.list = async (req, res) => {
  try {
    const info = await RedisInfo.findAll();
    if (!info.length) {
      throw new Error("Data not found");
    }
    req.locals = { info };
  } catch (e) {
    console.log(err);
    return next(e);
  }
};

/**
 * Get info of saved redis server
 * @param {*} req : accepts md5 as key
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.get = async (req, res) => {
  try {
    this.load({ req, res, md5: req.query.md5 });
    return res.send(req.locals.info);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

/**
 * Create - save new redis info
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {Object} created redis info object
 */

exports.create = async (req, res, next) => {
  try {
    // check if the port and host is able to ping
    const ping = await RedisMonitor.ping(req.body);
    if (ping.success) throw new Error("Ping Error!");
    req.body.md5 = md5(req.body.host + req.body.port.toString());
    const redisInfo = await RedisMonitorModel.create(req.body);
    return res.send(redisInfo);
  } catch (e) {
    return next(e);
  }
};

/**
 * Get redis information
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {Object} Redis details object
 */
exports.get_info = async (req, res, next) => {
  try {
    this.load({ req, res, md5: req.query.md5 });
    if (!req.locals.info) throw new Error("Data not found");
    const { host, port, password } = req.locals.info;
    const redisMonitor = await RedisMonitor.get_info({ host, port, password });
    if (!redisMonitor) throw new Error("Unable to fetch Redis information");
    // return the user data
    return res.send(redisMonitor);
  } catch (e) {
    return next(e);
  }
};

exports.flush = async (req, res, next) => {
  try {
    this.load({ req, res, md5: req.query.md5 });
    const { host, port, password } = req.locals.info;
    const redisMonitor = await RedisMonitor.flush({ host, port, password, db: req.query.db });
    if(!redisMonitor) throw new Error("Flush activity Error")
    return res.send(redisMonitor);
  } catch (err) {
      return next(e);
  }
};

/**
 * Delete - delete redis info
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {} empty response
 */

exports.delete = async (req, res, next) => {
  try {
    this.load({ req, res, md5: req.query.md5 });
    const { info } = req.locals;
    await RedisMonitorModel.destroy({ where: { md5: info.md5 } });
    return res.send("Deleted");
  } catch (e) {
    return next(e);
  }
};
