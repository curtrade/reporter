const DbfTemplate = require('./abstract/dbf-template');

class SamaragazSvgcTemplate extends DbfTemplate {
    parseRows(rows) {
        const payDocNumber = this.payDocNumber;
        const payDocDate = this.payDocDate;

        return rows.map(row => ({
            kod: Buffer.from(row.account_ls.substring(3, 9)),
            fio: row.fio_full || row.fio,
            adress: row.address,
            vpl: row.payment_kind ? row.payment_kind.substring(0, 1) : '',
            plata: parseFloat(row.sum_from),
            cod_gg: row.account_ls ? row.account_ls.substring(0, 2) : '',
            nplp: Buffer.from(payDocNumber),
            pldat: Buffer.from(payDocDate),
            t_cod: 0, //todo: если qr-code, то 1
            app: parseInt(row.account)
        }));
    }
    getColumns() {
        return [
            // структура таблицы pug
            {
                name: 'kod',
                type: 'C',
                size: 7
            },
            {
                name: 'fio',
                type: 'C',
                size: 50
            },
            {
                name: 'adress',
                type: 'C',
                size: 100
            },
            {
                name: 'vpl',
                type: 'C',
                size: 1
            },
            {
                name: 'plata',
                type: 'N',
                precision: '2'
            },
            {
                name: 'cod_gg',
                type: 'N',
                size: 2
            },
            {
                name: 'nplp',
                type: 'C',
                size: 8
            },
            {
                name: 'pldat',
                type: 'D',
                size: 8
            },
            {
                name: 't_cod',
                type: 'N',
                size: 1
            },
            {
                name: 'app',
                type: 'N',
                size: 10
            }
        ];
    }
}

module.exports = SamaragazSvgcTemplate;
