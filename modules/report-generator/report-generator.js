const moment = require('moment');

const Report = require('../report');

const ContentGeneratorFactory = require('./content-generator-factory');
const contentGeneratorFactory = new ContentGeneratorFactory();

class ReportGenerator {
    constructor(
        columns = [],
        payments = [],
        providerData = null,
        period = {},
        filenameTemplate = null,
        templateId = null,
        encoding
    ) {
        if (!period.from || !period.to) {
            throw new Error(
                'ReportGenerator: period.from and period.to should be set'
            );
        }
        const title = this.getTitle(period);
        const filename = this.getFilename(filenameTemplate, period);

        const rows = payments.map(({ data, createdAt }) => ({
            ...data,
            _createdAt: moment(createdAt).format('DD.MM.YY hh:mm:ss')
        }));

        this.params = {
            title,
            columns,
            rows,
            providerData,
            period,
            filename,
            templateId,
            encoding
        };
    }

    getTitle(period) {
        return period.from === period.to
            ? `Реестр платежей за ${period.from}`
            : `Реестр платежей за период с ${period.from} по ${period.to}`;
    }

    getFilename(template, period) {
        if (!template) {
            return this.getTitle(period);
        }

        const matches = template.match(/{{(.*?)}}/);

        if (matches) {
            const periodString =
                period.from === period.to
                    ? period.momentFrom.format(matches[1])
                    : `${period.momentFrom.format(
                          matches[1]
                      )}-${period.momentTo.format(matches[1])}`;
            return template.replace(matches[0], periodString);
        } else {
            return template;
        }
    }

    async generate(format) {
        const contentGenerator = contentGeneratorFactory.create(format);
        const content = await contentGenerator.generate(this.params);

        const {
            params: { title, filename, encoding }
        } = this;

        return new Report(filename || title, format, content, encoding);
    }
}

module.exports = ReportGenerator;
