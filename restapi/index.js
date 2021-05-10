'use strict';

const config = require('../config');
const { sentry } = require('../coresystem.js');
const { ExtraError } = require('../modules/error-types');
const express = require('express');
const basicAuth = require('express-basic-auth');
const rateLimitExpress = require('express-rate-limit');
const cors = require('cors');
const Logger = require('../modules/logger');
const loggingMiddleware = require('./middlewares/logging-middleware');
const handleApiErrorMiddleware = require('./middlewares/handle-error-middleware');
// instead of try...catch in every route
// todo: проверить как работает, как использовать!
//require('express-async-errors');

const logger = new Logger('REST API');

if (!config.web) {
    throw new Error('incorrect config: config.web should be set');
}

if (!config.web.host) {
    throw new Error('incorrect config: config.web.host should be set');
}

if (!config.web.port) {
    throw new Error('incorrect config: config.web.port should be set');
}

const restapi = express();
restapi.use(basicAuth(config.basicAuth));

restapi.set('trust proxy', 1);

const rateLimit = rateLimitExpress({
    windowMs: 1 * 60 * 1000,
    max: 5,
    onLimitReached: function (req /*, res, options*/) {
        throw new ExtraError(
            `${req.method} ${req.url} rate limit reached`,
            req
        );
    }
});

if (sentry.Handlers) {
    restapi.use(sentry.Handlers.requestHandler());
}

restapi.use(cors());

restapi.use('/reports', express.static(appRoot + '/reports'));
restapi.use(rateLimit);

restapi.use(express.urlencoded({ extended: true }));

restapi.use(express.json({ extended: true }));

//Enable request logging
restapi.use(loggingMiddleware);

restapi.use(require('./routes'));

//Enable api error handling
restapi.use(handleApiErrorMiddleware);

restapi.listen(config.web.port, () =>
    logger.info(
        `started on: ${config.web.protocol}://${config.web.host}:${config.web.port}`
    )
);

module.exports = restapi;
