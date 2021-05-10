//Relations

// The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL.
// The defaults for the One-To-One associations is SET NULL for ON DELETE and CASCADE for ON UPDATE.

module.exports = db => {
    db.Provider = require('./provider.js');
    db.Payment = require('./payment.js');
    db.ReportTemplate = require('./report-template.js');
    db.CronTask = require('./cron-task.js');
};
