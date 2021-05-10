const ClientbankTemplate = require('./txt-templates/clientbank-template');

class TxtTemplatesFactory {
    static create({ templateId, ...params }) {
        switch (templateId) {
            case 'clientbank':
                return new ClientbankTemplate({
                    ...params
                });
            default:
                throw new Error(
                    'Template not found for templateId:' + templateId
                );
        }
    }
}

module.exports = TxtTemplatesFactory;
