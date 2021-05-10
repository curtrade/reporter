const json2html = require('node-json2html');
const ContentGenerator = require('./abstract/content-generator');

class HtmlGenerator extends ContentGenerator {
    async generate({ columns, title, rows }) {
        const totals = this.calculateTotals(columns, rows);
        const tableHeadersTemplate = { '<>': 'td', html: '${title}' };
        const tableHeadersHtml = json2html.transform(
            columns,
            tableHeadersTemplate
        );

        let rowsHtml = '';
        for (const column of columns) {
            rowsHtml += '<td>${' + column.field + '}</td>';
        }

        const tableRowsTemplate = { tag: 'tr', html: rowsHtml };
        const tableRowsHtml = json2html.transform(rows, tableRowsTemplate);

        return this.generateHtml(
            title,
            tableHeadersHtml,
            tableRowsHtml,
            totals
        );
    }

    async generateHtml(title, tableHeadersHtml, tableRowsHtml, totals) {
        const html =
            '<!DOCTYPE html>\n' +
            '<head lang="ru">\n' +
            '<title>' +
            title +
            '</title>\n' +
            '<meta charset="utf-8">\n' +
            '</head>\n' +
            '<body>\n' +
            '<h2>' +
            title +
            '</h2>\n' +
            '<br><br>' +
            '<table border="1px">\n' +
            '<tr bgcolor="#9acd32">\n' +
            tableHeadersHtml +
            '</tr>\n' +
            tableRowsHtml +
            '</table>\n' +
            '<br>' +
            '<b>Общий итог по всем платежам: ' +
            totals.sum +
            ' руб.</b>' +
            '</body>\n' +
            '</html>\n';
        return html;
    }
}

module.exports = HtmlGenerator;
