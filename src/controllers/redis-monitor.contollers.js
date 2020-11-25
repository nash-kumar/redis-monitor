const RedisMonitorModel = require('../models').RedisMonitor;
const r = require('redis');

exports.get = async (req, res) => {
    const val = await RedisMonitorModel.findAll();
    res.send({val});
}
// console.log(r.createClient().on('error', () => console.log('Ready')));