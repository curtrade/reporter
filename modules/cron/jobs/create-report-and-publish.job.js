const moment = require('moment');
const config = require(appRoot + '/config');
const ReportTemplate = require(appRoot + '/models/report-template');
const Delivery = require(appRoot + '/modules/delivery');
const Reporter = require(appRoot + '/modules/reporter');

async function createReportAndPublish() {
    const { params: { providerId, format, period, recipients } = {} } = this;

    if (!providerId) {
        throw new Error('providerId missing');
    }
    if (!format) {
        throw new Error('format missing');
    }
    if (!period) {
        throw new Error('period missing');
    }

    if (period !== 'yesterday') {
        throw new Error('unknown period:' + period);
    }

    if (!recipients || recipients.length === 0) {
        throw new Error('recipients missing');
    }

    const startMoment = moment()
        .subtract(1, 'days')
        .startOf('day');
    const endMoment = moment()
        .subtract(1, 'days')
        .endOf('day');

    const template = await ReportTemplate.findOne({
        where: {
            status: 'active',
            providerId,
            format
        }
    });

    if (!template) {
        throw new Error('Report template not found in database');
    }

    const delivery = new Delivery(config.delivery);
    const reporter = new Reporter(delivery);

    const result = await reporter.createAndPublish(
        template,
        startMoment,
        endMoment,
        recipients
    );
    return result;
}

module.exports = createReportAndPublish;
