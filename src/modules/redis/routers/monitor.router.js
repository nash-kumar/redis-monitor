const controller = require("../controllers/monitor.contollers");
const validate = require("./monitor.validate");

module.exports = (router, validator) => {
  
  // Create redis connection details
  router.route("/add").post(validator(validate.create), controller.create);

  // Get redis list
  router.route("/redis_list").get(controller.list);

  // Get single redis information 
  router.route("/redis_info").get(validator(validate.get), controller.get);

  // Get redis information from redis API
  router.route("/redis_monitor").get(validator(validate.get_info), controller.get_info);

  // flush all keys from DB
  router
    .route("/redis/flushall")
    .get(validator(validate.flush), controller.flush);

  // Delete redis connection details
  router.route("/del").post(validator(validate.delete), controller.delete);

  return router;
};
