const HttpStatus = require('http-status');

/**
 * Erorr message from error object
 * @param {object} err
 */
const errorMessage = (err) => {
    let message;
    if (err.message === 'validation error') {
        message = err.errors[0].messages[0];
    } else if (err.message) {
        ({ message } = err);
    } else {
        message = 'Oops, Something went wrong!';
    }
    return message;
};

/**
* Generic error response
*/
exports.errorResponse = (err) => {
    // return common error response object
    return {
        success: false,
        status: err.status ? err.status : HttpStatus.BAD_REQUEST,
        name: err.name ? err.name : 'ApiError',
        message: errorMessage(err),
        errors: err.errors ? err.errors : [],
        isPublic: true,
        info: err.info ? err.info : {},
    };
};