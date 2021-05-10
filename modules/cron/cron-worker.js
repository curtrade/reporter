'use strict';
const path = require('path');
global.appRoot = path.resolve();

const { parentPort } = require('worker_threads');
const JobFactory = require('./job-factory');

let jobs = [];

function updateCronJobs(tasks) {
    if (tasks && tasks.length === 0) {
        throw new Error('updateCronJobs: tasks is empty');
    }

    if (jobs.length > 0) {
        for (const job of jobs) {
            job.stop();
        }
        jobs = [];
    }

    for (const task of tasks) {
        const job = JobFactory.create(task);
        jobs.push(job);
    }

    return 'jobs updated, new jobs count: ' + jobs.length;
}

parentPort.on('message', ({ action, params }) => {
    let status;

    try {
        if (action === 'ping') {
            status = 'pong';
        } else if (
            action === 'start_cron_jobs' ||
            action === 'update_cron_jobs'
        ) {
            status = updateCronJobs(params.tasks);
        } else {
            status = 'unknown action';
        }
    } catch ({ message }) {
        status = message;
    }

    parentPort.postMessage(status);
});
