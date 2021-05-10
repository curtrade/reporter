const DbfTemplate = require('./abstract/dbf-template');

class SvgcSgVTemplate extends DbfTemplate {
    parseRows(rows) {
        const { payDocNumber, payDocDate } = this;

        return rows.map(row => ({
            kod: Buffer.from(row.account.substring(3, 9)),
            fio: row.fio_full || row.fio,
            adress: row.address,
            cou_val_b: 0,
            cou_val_s: row.newgaz_meter || 0,
            plata: parseFloat(row.sum_from),
            comiss:
                Math.round(parseFloat((row.sum_from / 100) * 0.8) * 100) / 100,
            cod_gg: row.account.substring(0, 2),
            nplp: Buffer.from(payDocNumber),
            pldat: Buffer.from(payDocDate),
            lserr: Buffer.from('0'),
            tip_gaz: Buffer.from('S')
        }));
    }
    getColumns() {
        return [
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
                name: 'cou_val_b',
                type: 'N',
                size: 12
            },
            {
                name: 'cou_val_s',
                type: 'N',
                size: 12
            },
            {
                name: 'plata',
                type: 'N',
                precision: '2'
            },
            {
                name: 'comiss',
                type: 'N',
                precision: '2'
            },
            {
                name: 'cod_gg',
                type: 'N',
                size: 12 //2
            },
            {
                name: 'nplp',
                type: 'C',
                size: 8 //6
            },
            {
                name: 'pldat',
                type: 'D',
                size: 8
            },
            {
                name: 'lserr',
                type: 'C',
                size: 1
            },
            {
                name: 'tip_gaz',
                type: 'C',
                size: 1
            }
        ];
    }
}

module.exports = SvgcSgVTemplate;
