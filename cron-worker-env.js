const { Worker } = require('worker_threads');
const worker = new Worker('./modules/cron/cron-worker.js' /*, { workerData }*/);

module.exports = worker;
