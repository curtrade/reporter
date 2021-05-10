const ContentGenerator = require('./abstract/content-generator');
const TemplatesFactory = require('./templates/txt-templates-factory');

class TxtGenerator extends ContentGenerator {
    async generate({ templateId, columns, rows, period, providerData }) {
        const totals = this.calculateTotals(columns, rows);

        const template = TemplatesFactory.create({
            templateId,
            providerData,
            period,
            totals
        });

        const header = template.getHeader();
        const body = template.getBody(rows);
        const footer = template.getFooter();

        return `${header}${body}${footer}`;
    }
}

module.exports = TxtGenerator;
