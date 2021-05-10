'use strict';
const moment = require('moment');
const config = require(appRoot + '/config');
const { BadRequest, NotFound } = require(appRoot + '/modules/error-types');
const ReportTemplate = require(appRoot + '/models/report-template');
const Delivery = require(appRoot + '/modules/delivery');
const Reporter = require(appRoot + '/modules/reporter');

const getBaseUrl = require(appRoot + '/modules/get-base-url');
const convertPathToUrl = require(appRoot + '/modules/convert-path-to-url');

const revalidator = require('revalidator');
const schema = require(appRoot + '/schemas/build-report.schema');

module.exports = async (req, res) => {
    const { valid, errors } = revalidator.validate(req.query, schema);

    if (!valid) {
        throw new BadRequest(errors);
    }

    const startMoment = moment(req.query.startDate).startOf('day');
    const endMoment = moment(req.query.endDate).endOf('day');

    const template = await ReportTemplate.findOne({
        where: {
            status: 'active',
            providerId: req.query.providerId,
            format: req.query.format
        }
    });

    if (!template) {
        throw new NotFound('Report template not found in database');
    }

    const delivery = new Delivery(config.delivery);
    const reporter = new Reporter(delivery);
    const recipients = [{ address: '/', transport: 'file' }];

    let results = await reporter.createAndPublish(
        template,
        startMoment,
        endMoment,
        recipients
    );
    const baseUrl = getBaseUrl(config.web);

    const urls = results.map(result =>
        result.pathToFile
            ? {
                  fileLink: convertPathToUrl(
                      appRoot,
                      baseUrl,
                      result.pathToFile
                  )
              }
            : result
    );

    res.send(JSON.stringify(urls));
};
