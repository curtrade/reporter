if (!process.env) {
    process.env = {};
}
const mode = process.env.NODE_ENV || 'localhost';
console.log('mode ', mode);
const config = require('./' + mode);
module.exports = config;
