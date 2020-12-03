const Joi = require('joi');

module.exports = {
    create: {
        body: {
            port: Joi.number().required().default(),
            hostname: Joi.string().required(),
        }
    }
}