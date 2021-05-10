const moment = require('moment');
const TxtTemplate = require('./abstract/txt-template');
const {
    ourRS,
    ourCompanyINN,
    ourCompany,
    ourCompanyKPP,
    ourBank,
    ourBankCity,
    ourBIK,
    ourBankKC
} = require(appRoot + '/modules/requisites/our-requisites');
const getPayDocNumber = require('../../getters/get-pay-doc-number');

class ClientBankTemplate extends TxtTemplate {
    constructor(params) {
        super(params);
        this.payDocNumber = getPayDocNumber(this.period.momentFrom);
        this.startDate = this.period.momentFrom.format('DD.MM.YYYY');
        this.endDate = this.period.momentTo.format('DD.MM.YYYY');
        this.totals = params.totals;
    }
    getHeader() {
        let strDocument = '1CClientBankExchange\r\n';

        strDocument += 'ВерсияФормата=1.02\r\n';
        strDocument += 'Кодировка=UTF-8\r\n';
        strDocument += 'Отправитель=ОДНО.КАСАНИЕ\r\n';
        strDocument += 'Получатель=\r\n';
        strDocument += 'ДатаСоздания=' + moment().format('DD.MM.YYYY') + '\r\n';
        strDocument += 'ВремяСоздания=08:08:08\r\n';
        strDocument += 'ДатаНачала=' + this.startDate + '\r\n';
        strDocument += 'ДатаКонца=' + this.endDate + '\r\n';
        strDocument += 'РасчСчет=' + ourRS + '\r\n';
        strDocument += 'Документ=Платежное поручение\r\n';

        return strDocument;
    }

    getBody() {
        const requisites = this.providerData.requisites;

        if (!requisites) {
            throw new Error('requisites should be set');
        }

        let strDocument = 'СекцияДокумент=Платежное поручение\r\n';
        strDocument += 'Номер=' + this.payDocNumber + '\r\n';
        strDocument += 'Дата=' + this.startDate + '\r\n';
        strDocument += 'Сумма=' + this.totals.sum + '\r\n';
        strDocument += 'ПлательщикСчет=' + ourRS + '\r\n';
        strDocument += 'ПлательщикИНН=' + ourCompanyINN + '\r\n';
        strDocument += 'Плательщик=' + ourCompany + '\r\n';
        strDocument += 'ПлательщикКПП=' + ourCompanyKPP + '\r\n';
        strDocument += 'ПлательщикРасчСчет=' + ourRS + '\r\n';
        strDocument += 'ПлательщикБанк1=' + ourBank + '\r\n';
        strDocument += 'ПлательщикБанк2=' + ourBankCity + '\r\n';
        strDocument += 'ПлательщикБИК=' + ourBIK + '\r\n';
        strDocument += 'ПлательщикКорсчет=' + ourBankKC + '\r\n';
        strDocument += 'ПолучательСчет=' + requisites.accountsRS + '\r\n';
        strDocument += 'ПолучательИНН=' + requisites.accountsINN + '\r\n';
        strDocument += 'ПолучательКПП=' + requisites.accountsKPP + '\r\n';
        strDocument += 'Получатель1=' + requisites.accountsTitle + '\r\n';
        strDocument += 'ПолучательРасчСчет=' + requisites.accountsRS + '\r\n';
        strDocument += 'ПолучательБанк1=' + requisites.accountsBank + '\r\n';
        strDocument +=
            'ПолучательБанк2=' + requisites.accountsBankCity + '\r\n';
        strDocument += 'ПолучательБИК=' + requisites.accountsBIK + '\r\n';
        strDocument +=
            'ПолучательКорсчет=' + requisites.accountsBankKC + '\r\n';
        strDocument += 'ВидПлатежа=\r\n'; //электронно\r\n';
        strDocument += 'ВидОплаты=01\r\n';
        strDocument += 'Очередность=5\r\n';
        strDocument += 'СтатусСоставителя=\r\n';
        // strDocument +=
        //     'НазначениеПлатежа=' +
        //     this._getDocumentDescription(
        //         requisites.documentDesriptionTemplate,
        //         requisites.accountsContractNum,
        //         requisites.accountsContractDate,
        //         this.startDate
        //     ) +
        //     '\r\n';

        strDocument += 'КонецДокумента\r\n';

        return strDocument;
    }

    _getDocumentDescription(template, contractNum, contractDate, documentDate) {
        if (typeof template === 'undefined') {
            template =
                'По договору № {contractNum} от {contractDate}г. за принятые платежи за {documentDate}г.  Без налога НДС.';
        }
        let description = template;
        description = description.replace(/{contractNum}/i, contractNum);
        description = description.replace(/{contractDate}/i, contractDate);
        description = description.replace(/{documentDate}/i, documentDate);

        return description;
    }

    getFooter() {
        return 'КонецФайла\r\n';
    }
}

module.exports = ClientBankTemplate;
