const RedisMonitorModel = require('../models').RedisMonitor;
const r = require('redis');

exports.get = async (req, res) => {
    try {
        const val = await r.createClient();
        res.send({ val });
    } catch (err) {
        res.send(err)
    }
}

exports.getById = async (req, res) => {
    try {
        const val = await RedisMonitorModel.findAll();
        res.send({ val });
    } catch (err) {
        res.send(err)
    }
}

exports.post = async (req, res) => {
    try {
        const val = await RedisMonitorModel.findAll();
        res.send({ val });
    } catch (err) {
        res.send(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const val = await RedisMonitorModel.findAll();
        res.send({ val });
    } catch (err) {
        res.send(err)
    }
}
console.log(r.createClient().on('error', () => console.log('Ready')));