const controller = require("../controllers/redis-monitor.contollers");
const validate = require("./redis-monitor.validate");

module.exports = (router, validator) => {
  router.use("/redis");

  router.route("/redis").get(validator(validate.list), controller.list);

  router
    .route("/redis/:id")
    .get(validator(validate.get), controller.get)
    .put(validator(validate.update), controller.update)
    .delete(validator(validate.delete), controller.delete);

  /**
   * Load user when API with userId route parameter is hit
   */
  router.param("userId", controller.load);

  return router;
};