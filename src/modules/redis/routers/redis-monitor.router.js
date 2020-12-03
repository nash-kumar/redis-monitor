const controller = require("../controllers/redis-monitor.contollers");
const validate = require("./redis-monitor.validate");

module.exports = (router, validator) => {
  router.use("/redis");

  router
    .route("/redis/add")
    .post(validator(validate.create), controller.create);

  router
    .route("/redis/redis_list")
    .get(validator(validate.list), controller.list);

  router
    .route("/redis/redis_info")
    .get(validator(validate.get), controller.get);

  router.route("/redis/redis_monitor").get(controller.get_info);

  //flush all
  router
    .route("/redis/flushall")
    .get(controller.flush)
    .post(controller.flush);

  router
    .route("/redis/del")
    .post(validator(validate.delete), controller.delete);

  return router;
};
