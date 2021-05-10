const {
    sequelize: { database, user, password, settings }
} = require('./config');
const Sequelize = require('sequelize');

//console.debug(config);

const sequelize = new Sequelize(database, user, password, settings);

module.exports = sequelize;
