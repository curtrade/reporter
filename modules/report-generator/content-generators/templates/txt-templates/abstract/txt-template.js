class TxtTemplate {
    constructor({ period, providerData = {} }) {
        if (!period) {
            throw new Error('period should be set');
        }
        if (!period.momentFrom || !period.momentTo) {
            throw new Error(
                'period has incorect format: momentFrom and momentTo should be set'
            );
        }

        this.period = period;
        this.providerData = providerData;
    }
    getHeader() {
        throw new Error('method "getHeader" should be realized');
    }
    getBody(/*rows*/) {
        throw new Error('method "getBody" should be realized');
    }
    getFooter() {
        throw new Error('method "getFooter" should be realized');
    }
}

module.exports = TxtTemplate;
