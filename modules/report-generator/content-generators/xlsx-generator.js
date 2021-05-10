var xl = require('excel4node');
const ContentGenerator = require('./abstract/content-generator');

class XlsxGenerator extends ContentGenerator {
    async generate({ columns, title, rows }) {
        const totals = this.calculateTotals(columns, rows);
        return this.generateXlsx(title, columns, rows, totals);
    }

    async generateXlsx(title, columns, rows, totals) {
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet(title);
        let cellValue, i, j;

        ws.cell(1, 1)
            .string(title)
            .style({ font: { bold: true, size: 14 } });

        j = 1;
        for (let column of columns) {
            ws.cell(3, j)
                .string(column.title)
                .style({
                    border: {
                        top: {
                            style: 'thin',
                            color: '#000000'
                        },
                        left: {
                            style: 'thin',
                            color: '#000000'
                        },
                        bottom: {
                            style: 'thin',
                            color: '#000000'
                        }
                    }
                })
                .style({
                    font: {
                        bold: true
                    }
                })
                .style({
                    alignment: {
                        horizontal: 'center'
                    }
                });
            j++;
        }

        i = 0;
        for (let row of rows) {
            j = 1;
            for (let column of columns) {
                cellValue = row[column.field] || '';

                if (j == 1) {
                    ws.column(i).setWidth(cellValue.toString().length + 1);
                }

                if (
                    !isNaN(parseFloat(cellValue)) &&
                    cellValue.toString().length <= 10
                ) {
                    ws.cell(i + 4, j)
                        .number(parseFloat(cellValue))
                        .style({
                            border: {
                                left: {
                                    style: 'thin',
                                    color: '#000000'
                                },
                                right: {
                                    style: 'thin',
                                    color: '#000000'
                                }
                            }
                        });
                } else {
                    ws.cell(i + 4, j)
                        .string(cellValue)
                        .style({
                            border: {
                                left: {
                                    style: 'thin',
                                    color: '#000000'
                                },
                                right: {
                                    style: 'thin',
                                    color: '#000000'
                                }
                            }
                        });
                }
                j++;
            }
            i++;
        }

        for (let j = 0; j < columns.length; j++) {
            ws.cell(i + 4, j + 1).style({
                border: {
                    top: {
                        style: 'thin',
                        color: '#000000'
                    }
                }
            });
            j++;
        }

        ws.cell(i + 6, 1)
            .string('Общий итог по всем платежам: ' + totals.sum + ' руб.')
            .style({ font: { bold: true } });

        const xlsx = await wb.writeToBuffer();
        return xlsx;
    }
}

module.exports = XlsxGenerator;
