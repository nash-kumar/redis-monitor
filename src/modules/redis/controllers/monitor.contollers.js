const RedisMonitorModel = require("../models/monitor.model");
const RedisMonitor = require("../../../config/libs/redis");
const { md5 } = require("../../../config/libs/crypto");
const { concat } = require("joi");

/**
 * Load redis info
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {Function} next handler
 */
load = async (cryto) => {
  try {
    const info = await RedisMonitorModel.findOne({ where: { md5: cryto } });
    if (!info) {
      throw new Error("Data not found");
    }
    return info;
  } catch (e) {
    return false;
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

exports.list = async (req, res, next) => {
  try {
    const info = await RedisMonitorModel.findAll();
    if (!info.length) {
      return res.send({ success: 1, data: [] });
    }

    return res.send({ success: 1, data: info });
  } catch (e) {
    return next(e);
  }
};

/**
 * Get info of saved redis server
 * @param {Object} req : accepts md5 as key
 * @param {Object} res
 * @param {Object} next
 * @returns {JSON} Redis info object
 */
exports.get = async (req, res, next) => {
  try {
    const info = await RedisMonitorModel.findOne({
      where: { md5: req.query.md5 },
    });
    if (!info) throw new Error("Data not found");

    return res.send({ success: 1, data: info });
  } catch (e) {
    return next(e);
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
    if (!ping.success) throw new Error("Ping Error!");

    req.body.md5 = md5(req.body.host + req.body.port.toString());

    let info = await RedisMonitorModel.findOne({
      where: { md5: req.body.md5 },
    });
    if (!info) {
      info = await RedisMonitorModel.create(req.body);
    } else {
      info.password = req.body.password;
    }

    return res.send({ success: 1, data: info });
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
    const info = await RedisMonitorModel.findOne({
      where: { md5: req.query.md5 },
    });
    if (!info) throw new Error("Data not found");
    const { host, port, password } = info;

    const redisMonitor = await RedisMonitor.get_info({ host, port, password });
    if (!redisMonitor) throw new Error("Unable to fetch Redis information");

    // return the redis data
    return res.send({ success: 1, data: redisMonitor });
  } catch (e) {
    return next(e);
  }
};

/**
 * Flush - delete all redis key from redis databse
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {JSON} empty response
 */

exports.flush = async (req, res, next) => {
  try {
    const { md5, db } = req.query;

    const info = await RedisMonitorModel.findOne({ where: { md5: md5 } });
    if (!info) throw new Error("Unable to Flush the infomartion");
    const { host, port, password } = info;

    const redisMonitor = await RedisMonitor.flushall({ host, port, password, db });
    if (!redisMonitor) throw new Error("Flush activity Error");

    return res.send(redisMonitor);
  } catch (e) {
    return next(e);
  }
};

/**
 * Delete - delete redis info from database
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next handler function
 * @return {JSON} empty response
 */

exports.delete = async (req, res, next) => {
  try {
    const info = await RedisMonitorModel.findOne({
      where: { md5: req.body.md5 },
    });
    if (!info) throw new Error("Not able to delete");

    await RedisMonitorModel.destroy({ where: { md5: info.md5 } });

    return res.send({ success: 1, data: "Deleted" });
  } catch (e) {
    return next(e);
  }
};
