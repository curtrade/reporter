const ContentGenerator = require('./abstract/content-generator');
const TemplatesFactory = require('./templates/dbf-templates-factory');
const getPayDocNumber = require('./getters/get-pay-doc-number');
const getPayDocDate = require('./getters/get-pay-doc-date');

const dbfEditor = require('editor-dbf');
const DBFWriter = dbfEditor.DBFWriter;

class DbfGenerator extends ContentGenerator {
    async generate({
        templateId,
        rows,
        period: { momentFrom: reportMoment },
        encoding = 'utf-8'
    }) {
        const payDocNumber = getPayDocNumber(reportMoment);
        const payDocDate = getPayDocDate(reportMoment, templateId);

        const template = TemplatesFactory.create({
            templateId,
            payDocNumber,
            payDocDate
        });

        const columns = template.getColumns();
        const parsedRows = template.parseRows(rows);

        return this.generateDbf(columns, parsedRows, encoding);
    }

    async generateDbf(columns, rows, encoding) {
        const dbfWriter = new DBFWriter(columns, rows, 'no-file', 'no-file', {
            encoding
        });

        const dbf = dbfWriter._generate();
        return dbf;
    }
}

module.exports = DbfGenerator;
