const path = require('path');
global.appRoot = path.resolve();

const Payment = require('./models/payment');
Payment.sync();

const Provider = require('./models/provider');
Provider.sync();

const ReportTemplate = require('./models/report-template');
ReportTemplate.sync();

const CronTasks = require('./models/cron-tasks');
CronTasks.sync();
