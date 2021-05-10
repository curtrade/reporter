const path = require('path');
global.appRoot = path.resolve();

const config = require('./config');

const Delivery = require('./modules/delivery');
const Reporter = require('./modules/reporter');
const ReportTemplate = require('./models/report-template');

(async () => {
    const startDate = '2021-02-18 00:00:00';
    const endDate = '2021-02-19 00:00:00';

    const reportTemplates = await ReportTemplate.findAll({
        where: {
            isEnabled: true
        }
    });

    const delivery = new Delivery(config.delivery);
    for (const reportTemplate of reportTemplates) {
        const reporter = new Reporter(delivery);

        try {
            await reporter.createAndPublish(reportTemplate, startDate, endDate);
        } catch (e) {
            console.error('./create-and-publish-report error:', {
                message: e.message,
                stack: e.stack
            });
        }
    }
})();
