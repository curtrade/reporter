const indexes = require('./structures/report-indexes-structure');

function getPayDocNumber(reportMoment, title) {
    return reportMoment.format('DDMMYY') + getReportIndex(title);
}

function getReportIndex(title) {
    return indexes[title] ? indexes[title] : '';
}

module.exports = getPayDocNumber;
