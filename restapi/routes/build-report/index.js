'use strict';

const { Router } = require('express');
const localRoutes = Router();
require('express-async-errors');

localRoutes.get('/', require('./build-report'));

module.exports = localRoutes;
