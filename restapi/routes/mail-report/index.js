'use strict';

const { Router } = require('express');
const localRoutes = Router();
require('express-async-errors');

localRoutes.get('/', require('./mail-report'));

module.exports = localRoutes;
