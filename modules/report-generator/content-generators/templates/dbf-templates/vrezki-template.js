const DbfTemplate = require('./abstract/dbf-template');

class VrezkiTemplate extends DbfTemplate {
    parseRows(rows) {
        const payDocNumber = this.payDocNumber;
        const payDocDate = this.payDocDate;

        return rows.map(row => ({
            'R-DOP': Buffer.from(
                '' +
                    row._createdAt.substring(0, 4) +
                    row._createdAt.substring(5, 7) +
                    row._createdAt.substring(8, 10)
            ),
            'R-CODGG': row.account ? row.account.substring(0, 2) : 0,
            'R-LCSH': row.account ? row.account.substring(3, 9) : 0,
            'R-PLP': Buffer.from(payDocNumber),
            'R-FIO': Buffer.from(row.fio_full || row.fio || ''),
            'R-ADRESS': Buffer.from(row.address || ''),
            'R-Data': Buffer.from(payDocDate),
            'R-SUM': row.sum ? parseFloat(row.sum) : 0,
            'R-Sbor': 0,
            'R-Plat': row.sum ? parseFloat(row.sum) : 0,
            'R-Naz': row.payment_kind_full
                ? Buffer.from(row.payment_kind_full)
                : '',
            'R-KeyDiv': row.keydiv ? parseInt(row.keydiv) : 0,
            T_Cod: 0
        }));
    }

    getColumns() {
        return [
            // структура таблиц врезки
            {
                name: 'R-DOP',
                type: 'D',
                size: 8
            },
            {
                name: 'R-CODGG',
                type: 'N',
                size: 2
            },
            {
                name: 'R-LCSH',
                type: 'N',
                size: 6
            },
            {
                name: 'R-FIO',
                type: 'C',
                size: 50
            },
            {
                name: 'R-ADRESS',
                type: 'C',
                size: 100
            },
            {
                name: 'R-PLP',
                type: 'C',
                size: 8
            },
            {
                name: 'R-Data',
                type: 'D',
                size: 8
            },
            {
                name: 'R-SUM',
                type: 'N',
                size: 15,
                precision: 2
            },
            {
                name: 'R-Sbor',
                type: 'N',
                size: 15,
                precision: 2
            },
            {
                name: 'R-Plat',
                type: 'N',
                size: 15,
                precision: 2
            },
            {
                name: 'R-Naz',
                type: 'C',
                size: 30
            },
            {
                name: 'R-KeyDiv',
                type: 'N',
                size: 3
            },
            {
                name: 'T_Cod',
                type: 'N',
                size: 1
            }
        ];
    }
}

module.exports = VrezkiTemplate;
