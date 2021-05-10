'use strict';

const { Router } = require('express');
const localRoutes = Router();
require('express-async-errors');

localRoutes.get('/', require('./restart-cron-jobs'));

module.exports = localRoutes;
