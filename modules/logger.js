'use strict';

class Logger {
    constructor(
        namespace = 'undefined',
        {
            info: infoAction,
            warn: warnAction,
            debug: debugAction,
            error: errorAction
        } = {}
    ) {
        this.namespace = namespace;
        const defaultAction = () => {};

        if (!Logger.actionsSet) {
            Logger.infoAction = infoAction || defaultAction;
            Logger.warnAction = warnAction || defaultAction;
            Logger.debugAction = debugAction || defaultAction;
            Logger.errorAction = errorAction || defaultAction;
            Logger.actionsSet = true;
        }
    }

    _printMessage(logAction, message, object) {
        if (message instanceof Error) {
            message.message = `${this.namespace} ${message.message}`;

            object = object || {};

            Object.assign(object, { namespace: this.namespace });
        } else if (typeof message === 'string') {
            message = `${this.namespace} ${message}`;
        }

        if (object) {
            logAction(message, object);
        } else {
            logAction(message);
        }
    }

    info(message, object) {
        this._printMessage(Logger.infoAction, message, object);
    }

    warn(message, object) {
        this._printMessage(Logger.warnAction, message, object);
    }

    debug(message, object) {
        this._printMessage(Logger.debugAction, message, object);
    }

    error(message, object) {
        this._printMessage(Logger.errorAction, message, object);
    }
}

module.exports = Logger;
