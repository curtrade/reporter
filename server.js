'use strict';

const path = require('path');
global.appRoot = path.resolve();

require('./coresystem'); //should be always first!

module.exports = require('./restapi');
