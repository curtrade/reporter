'use strict';

const Logger = require('../../modules/logger');
const logger = new Logger('REST API');

const { ApiError } = require('../../modules/error-types');

const SYSTEM_ERROR_HTTP_CODE = 500;
const SYSTEM_ERROR_MESSAGE = 'Что-то пошло не так, попробуйте снова';

module.exports = (err, req, res, next) => {
    if (err) {
        logger.error(err);

        if (err instanceof ApiError) {
            res.status(err.statuscode).json({
                message: err.shortmessage
            });
        } else {
            res.status(SYSTEM_ERROR_HTTP_CODE).json({
                message: SYSTEM_ERROR_MESSAGE
            });
        }
    }

    next(err);
};
