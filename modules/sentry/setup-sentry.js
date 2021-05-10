'use strict';

let sentry = require('@sentry/node');
const sentryIntegrations = require('@sentry/integrations');
const { ExtraError } = require('../error-types');

function getSentryExtended({ config, consoleConfig }) {
    if (config.sentry && config.sentry.dsn) {
        sentry.init({
            dsn: config.sentry.dsn,
            environment: process.env.NODE_ENV,
            serverName: config.graylogger.logHost,
            debug: false,
            integrations: [new sentryIntegrations.Dedupe()],
            captureUnhandledRejections: true,
            beforeSend: (event, hint) => {
                console.error(
                    'beforeSend: ' + hint.originalException ||
                        hint.syntheticException
                );

                return event;
            }
        });

        sentry.getExpressExtras = function (req) {
            return {
                request_method: req.method,
                request_baseUrl: req.baseUrl,
                request_headers: req.headers,
                request_body: req.body,
                request_params: req.params,
                request_query: req.query
            };
        };

        sentry.captureError = function (err, params = {}) {
            let level = params.level || 'error';
            delete params.level;

            let captureError;
            let extraParams = {};

            if (err instanceof Error) {
                captureError = sentry.captureException;
                if (err instanceof ExtraError) {
                    extraParams = err.params;
                }
            } else {
                captureError = sentry.captureMessage;
            }

            console.debug('sentry.captureError()', {
                ...params,
                ...extraParams
            });

            sentry.withScope((scope) => {
                if (params.namespace) {
                    scope.setTag('namespace', params.namespace);
                    delete params.namespace;
                }

                Object.keys(params).forEach((key) => {
                    if (
                        params[key] &&
                        params[key].headers &&
                        typeof params[key].headers.host === 'string'
                    ) {
                        Object.assign(
                            params,
                            sentry.getExpressExtras(params[key])
                        );
                        if (params[key].project_auth) {
                            sentry.setUser({
                                id: params[key].project_auth.id,
                                username: params[key].project_auth.title
                            });
                        }

                        delete params[key];
                    }
                });

                Object.keys(params).forEach((key) => {
                    scope.setExtra(key, params[key]);
                });

                Object.keys(extraParams).forEach((key) => {
                    scope.setExtra(key, extraParams[key]);
                });

                scope.setLevel(level);

                captureError(err);
            });
        };
    } else {
        consoleConfig.handleExceptions();

        sentry = {
            captureError: function captureError(err, params = {}) {
                Object.keys(params).forEach((key) => {
                    if (
                        params[key] &&
                        params[key].headers &&
                        typeof params[key].headers.host === 'string'
                    ) {
                        Object.assign(
                            params,
                            sentry.getExpressExtras(params[key])
                        );

                        if (params[key].project_auth) {
                            sentry.setUser({
                                id: params[key].project_auth.id,
                                username: params[key].project_auth.title
                            });
                        }

                        delete params[key];
                    }
                });

                console.error(err, params);
            },
            configureScope: function configureScope() {},
            captureException: function captureException(err, params = null) {
                console.error(err, params);
            }
        };
    }

    return sentry;
}

module.exports = getSentryExtended;
