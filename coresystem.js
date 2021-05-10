'use strict';

const config = require('./config');
const consoleConfig = require('graylogger');
const getSentryExtended = require('./modules/sentry');

consoleConfig.init({ PrettyError: true });
if (config.graylogger && config.graylogger.host) {
    consoleConfig.grayLog(config.graylogger);
}

const sentry = getSentryExtended({ config, consoleConfig });

const Logger = require('./modules/logger');
const logger = new Logger('coresystem', {
    info: console.log,
    warn: console.warn,
    debug: console.debug,
    error: sentry.captureError
});

const cronWorker = require('./cron-worker-env');

cronWorker.on('message', message => {
    logger.info('Message from worker: ' + message);
});
cronWorker.on('error', ({ message, stack }) => {
    logger.error('worker error', { message, stack });
});
cronWorker.on('exit', code => {
    if (code !== 0) logger.error(`Worker stopped with exit code ${code}`);
});

const CronTask = require(appRoot + '/models/cron-task');

if (config.cron.startJobsOnSystemLoad) {
    (async () => {
        try {
            const tasks = await CronTask.findAll({
                attributes: ['action', 'cronTime', 'params'],
                where: {
                    status: 'active'
                }
            });
            if (!tasks || tasks.length === 0) {
                throw new Error('Cron tasks not found');
            }

            cronWorker.postMessage({
                action: 'start_cron_jobs',
                params: { tasks }
            });
        } catch (e) {
            logger.error('Error on start cron jobs:', e);
        }
    })();
}

const { version } = require('./package.json');

logger.info('service starting', {
    version,
    git_rev: process.env.GIT_REV || null
});

module.exports = {
    sentry
};
