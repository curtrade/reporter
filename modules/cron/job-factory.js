const cron = require('node-cron');
const createReportAndPublish = require('./jobs/create-report-and-publish.job.js');
const { parentPort } = require('worker_threads');

class JobFactory {
    static create({ dataValues: { action, cronTime, params } }) {
        let callback;
        switch (action) {
            case 'create_report_and_publish':
                callback = createReportAndPublish;
                break;
            default:
                throw new Error('JobFactory: unknown action: ' + action);
        }

        const boundCallback = callback.bind({ params });

        return cron.schedule(
            cronTime,
            async () => {
                try {
                    const result = await boundCallback();
                    parentPort.postMessage(JSON.stringify({ result }));
                } catch ({ message }) {
                    parentPort.postMessage(message);
                }
            },
            {
                scheduled: true,
                timezone: 'Europe/Moscow'
            }
        );
    }
}

module.exports = JobFactory;
