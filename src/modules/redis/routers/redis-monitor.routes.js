const router = require('express').Router();
const RedisMonitorController = require('../controllers/redis-monitor.contollers');
module.exports = router;


router.get('/', RedisMonitorController.get);
router.get('/:id', RedisMonitorController.getById);
router.post('/add', RedisMonitorController.addRedis);
router.delete('/delete', RedisMonitorController.delete);