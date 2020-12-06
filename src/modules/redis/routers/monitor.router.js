const controller = require("../controllers/monitor.contollers");
const validate = require("./monitor.validate");

module.exports = (router, validator) => {
    
  router
    .route("/add")
    .post(validator(validate.create), controller.create);

  router
    .route("/redis_list")
    .get(validator(validate.list), controller.list);

  router
    .route("/redis_info")
    .get(validator(validate.get), controller.get);

  router.route("/redis_monitor").get(validator(validate.get_info), controller.get_info);

//   flush all
  router
    .route("/redis/flushall")
    .get(controller.flush)
    .post(controller.flush)


  router
    .route("/del")
    .post(validator(validate.delete), controller.delete);

  return router;
};
