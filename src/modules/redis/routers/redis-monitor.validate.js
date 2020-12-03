const Joi = require('joi');

module.exports = {
    create: {
        body: {
            port: Joi.number().required().default(6379),
            host: Joi.string().required().default(undefined)
        }
    },
    list: {

    },
    get: {

    },
    get_info: {

    },
    delete: {

    }
}