const router = require('express').Router();
const RedisMonitorController = require('../controllers/redis-monitor.contollers');
module.exports = router;


router.get('/', RedisMonitorController.get);