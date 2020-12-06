const Joi = require("joi");

module.exports = {
  create: {
    body: {
      port: Joi.number().required(),
      host: Joi.string().required(),
      password: Joi.string().allow('')
    },
  },
  get: {
    query: {
      md5: Joi.string().required(),
    },
  },
  get_info: {
    query: {
      md5: Joi.string().required(),
    },
  },

  flush: {
    query: {
      md5: Joi.string().required(),
      db: Joi.string().required(),
    },
  },

  delete: {
    body: {
      md5: Joi.string().required(),
    },
  },
};
