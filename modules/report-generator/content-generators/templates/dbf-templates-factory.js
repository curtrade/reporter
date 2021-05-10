const VrezkiTemplate = require('./dbf-templates/vrezki-template');
const DopuslugiTemplate = require('./dbf-templates/dopuslugi-template');
const SamaragazSvgcTemplate = require('./dbf-templates/samaragaz-svgc-template');
const SvgcSgGTemplate = require('./dbf-templates/svgc-sg-g-template');
const SvgcSgVTemplate = require('./dbf-templates/svgc-sg-v-template');

class DbfTemplatesFactory {
    static create({ templateId, payDocNumber, payDocDate }) {
        switch (templateId) {
            //svgc_dopuslugi
            case 'dopuslugi':
                return new DopuslugiTemplate({
                    payDocNumber,
                    payDocDate
                });
            //vrezki
            case 'vrezki':
                return new VrezkiTemplate({
                    payDocNumber,
                    payDocDate
                });
            //samaragaz, svgc
            case 'samaragaz-svgc':
                return new SamaragazSvgcTemplate({
                    payDocNumber,
                    payDocDate
                });
            //svgc_g, sg_g
            case 'svgc-sg-g':
                return new SvgcSgGTemplate({
                    payDocNumber,
                    payDocDate
                });
            //svgc_v sg_v
            case 'svgc-sg-v':
                return new SvgcSgVTemplate({
                    payDocNumber,
                    payDocDate
                });
            default:
                throw new Error(
                    'Template not found for templateId:' + templateId
                );
        }
    }
}

module.exports = DbfTemplatesFactory;
