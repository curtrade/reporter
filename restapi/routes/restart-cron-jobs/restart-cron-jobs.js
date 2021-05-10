'use strict';

const cronWorker = require(appRoot + '/cron-worker-env');
const { NotFound } = require(appRoot + '/modules/error-types');
const CronTask = require(appRoot + '/models/cron-task');

module.exports = async (req, res) => {
    const tasks = await CronTask.findAll({
        attributes: ['action', 'cronTime', 'params'],
        where: {
            status: 'active'
        }
    });
    if (!tasks || tasks.length === 0) {
        throw new NotFound('Cron tasks not found');
    }

    cronWorker.postMessage({ action: 'update_cron_jobs', params: { tasks } });
    cronWorker.once('message', message => {
        res.json(message);
    });
};
