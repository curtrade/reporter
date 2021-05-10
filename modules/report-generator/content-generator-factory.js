const HtmlGenerator = require('./content-generators/html-generator');
const DbfGenerator = require('./content-generators/dbf-generator');
const XlsxGenerator = require('./content-generators/xlsx-generator');
const TxtGenerator = require('./content-generators/txt-generator');

class ContentGeneratorFactory {
    create(format) {
        switch (format) {
            case 'html':
                return new HtmlGenerator();
            case 'dbf':
                return new DbfGenerator();
            case 'xlsx':
                return new XlsxGenerator();
            case 'txt':
                return new TxtGenerator();
            default:
                throw new Error(
                    'ContentGeneratorFactory: unknown format: ' + format
                );
        }
    }
}

module.exports = ContentGeneratorFactory;
