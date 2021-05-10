class DbfTemplate {
    constructor({ payDocNumber, payDocDate }) {
        if (!payDocNumber || !payDocDate) {
            throw new Error('paydocNumber and payDocDate params should be set');
        }
        this.payDocNumber = payDocNumber;
        this.payDocDate = payDocDate;
    }
    getColumns() {
        throw new Error('method "getColumns" should be realized');
    }
    parseRows(/*rows*/) {
        throw new Error('method "parseRows" should be realized');
    }
}

module.exports = DbfTemplate;
