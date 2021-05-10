const DbfTemplate = require('./abstract/dbf-template');

class DopuslugiTemplate extends DbfTemplate {
    parseRows(rows) {
        const payDocNumber = this.payDocNumber;
        const payDocDate = this.payDocDate;

        return rows.map(row => {
            if (row['r-LCNT']) {
                //нестандартный параметр при вводе QR-кода
                row['R-LCNT'] = row['r-LCNT'];
            }
            return {
                r_dop: Buffer.from(
                    '' +
                        row._createdAt.substring(0, 4) +
                        row._createdAt.substring(5, 7) +
                        row._createdAt.substring(8, 10)
                ),
                r_lcnt: row['R-LCNT'] ? Buffer.from('' + row['R-LCNT']) : 0,
                r_chcnt: row.account ? Buffer.from('' + row.account) : '',
                d_chcnt: Buffer.from(
                    row['D-CHCNT']
                        ? '' +
                              row['D-CHCNT'].substring(6, 10) +
                              row['D-CHCNT'].substring(3, 5) +
                              row['D-CHCNT'].substring(0, 2)
                        : ''
                ),
                r_fio: row['fio_full'] || row['r-fio'] || '',
                r_plp: Buffer.from(payDocNumber),
                r_data: Buffer.from(payDocDate),
                r_sum: row.sum_from ? row.sum_from : 0,
                r_sbor: 0,
                r_plat: 0,
                r_naz: row['r-naz'] ? row['r-naz'] : '',
                r_adr: row['r-adr'] ? row['r-adr'] : '',
                r_pod: row['r-pod'] ? Buffer.from(row['r-pod']) : '',
                t_cod: Buffer.from('0')
            };
        });
    }
    getColumns() {
        return [
            // структура таблиц для допуслуг СВГК
            {
                name: 'r_dop',
                type: 'D',
                size: 8
            },
            {
                name: 'r_lcnt',
                type: 'C',
                size: 9
            },
            {
                name: 'r_chcnt',
                type: 'C',
                size: 10
            },
            {
                name: 'd_chcnt',
                type: 'D',
                size: 8
            },
            {
                name: 'r_fio',
                type: 'C',
                size: 40
            },
            {
                name: 'r_plp',
                type: 'C',
                size: 8
            },
            {
                name: 'r_data',
                type: 'D',
                size: 8
            },
            {
                name: 'r_sum',
                type: 'N',
                precision: '2'
            },
            {
                name: 'r_sbor',
                type: 'N',
                precision: '2'
            },
            {
                name: 'r_plat',
                type: 'N',
                precision: '2'
            },
            {
                name: 'r_naz',
                type: 'C',
                size: 30
            },
            {
                name: 'r_adr',
                type: 'C',
                size: 100
            },
            {
                name: 'r_pod',
                type: 'C',
                size: 30
            },
            {
                name: 't_cod',
                type: 'C',
                size: 1
            }
        ];
    }
}

module.exports = DopuslugiTemplate;
