const { Op } = require('sequelize');

const Payment = require('../../models/payment');
const Provider = require('../../models/provider');
const ReportGenerator = require('../report-generator');

class Reporter {
    constructor(publisher) {
        if (!publisher) {
            throw new Error('Reporter init error: publisher cannot be empty');
        }
        this.publisher = publisher;
    }

    async createAndPublish(template, startMoment, endMoment, recipients) {
        await this.create(template, startMoment, endMoment);
        return this.publish(recipients);
    }

    async create(template = {}, startMoment, endMoment) {
        const {
            columns,
            format,
            providerId,
            filename,
            customTemplateId,
            encoding
        } = template;

        const { data: providerData } =
            (await Provider.findOne({
                attributes: ['data'],
                where: {
                    id: providerId
                }
            })) || {};

        const payments =
            (await Payment.findAll({
                attributes: ['data', 'createdAt'],
                where: {
                    providerId,
                    createdAt: {
                        [Op.between]: [startMoment.format(), endMoment.format()]
                    }
                }
            })) || {};

        const reportGenerator = new ReportGenerator(
            columns,
            payments,
            providerData,
            {
                from: startMoment.format('DD.MM.YY'),
                to: endMoment.format('DD.MM.YY'),
                momentFrom: startMoment,
                momentTo: endMoment
            },
            filename,
            customTemplateId,
            encoding
        );
        const report = await reportGenerator.generate(format);

        this.report = report;
    }

    async publish(recipients) {
        if (
            !recipients ||
            !Array.isArray(recipients) ||
            recipients.length === 0
        ) {
            throw new Error("Reporter can't publish: recipients missing");
        }
        if (!this.report) {
            throw new Error('Reporter has no report to publish');
        }
        const publishResult = await this.publisher.publish(
            recipients,
            this.report
        );

        if (this.publisher.errors) {
            throw this.publisher.errors[0];
        }

        return publishResult;
    }
}

module.exports = Reporter;
