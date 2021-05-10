module.exports = {
    properties: {
        providerId: {
            description: 'Report provider id',
            type: 'string',
            maxLength: 25,
            allowEmpty: false,
            required: true
        },
        format: {
            description: 'Report format',
            type: 'string',
            minLength: 1,
            maxLength: 10,
            allowEmpty: false,
            required: true
        },
        startDate: {
            description: 'Report start date',
            type: 'string',
            format: 'date',
            allowEmpty: false,
            required: true
        },
        endDate: {
            description: 'Report end date',
            type: 'string',
            format: 'date',
            allowEmpty: false,
            required: true
        },
        mailto: {
            description: 'Report recipient email',
            type: 'string',
            format: 'email',
            allowEmpty: false,
            required: true
        }
    }
};
