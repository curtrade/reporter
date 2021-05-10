'use strict';

const express = require('express');
const routes = express.Router();

routes.use('/build-report', require('./build-report'));
routes.use('/mail-report', require('./mail-report'));
routes.use('/restart-cron-jobs', require('./restart-cron-jobs'));

module.exports = routes;
