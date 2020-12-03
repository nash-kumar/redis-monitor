const RedisMonitorModel = require('../models/redis-monitor.model');
const RedisMonitor = require('../../../config/libs/redis');

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
        const info = await RedisMonitorModel.findOne({ where: { md5: md5 } });
        if (!info) {
            throw new Error('Data not found');
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
        return res.send(info);
    } catch (e) {
        console.log(err);
        return next(e)
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
        const ping = await RedisMonitor.ping(req.body)
        if (ping.success) throw new Error('Ping Error!');
        req.body.md5 = md5(req.body.host + req.body.port.toString());
        const redisInfo = await RedisMonitorModel.create(req.body);
        return res.send(redisInfo);
    } catch (e) {
        return next(e)
    }
}

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
        const { info } = req.locals;
        await RedisMonitorModel.destroy({ where: { md5: info.md5 } });
        return res.send("Deleted");
    } catch (e) {
        return next(e)
    }
}