const sequelize = require('../sequelize-env.js');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class CronTask extends Model {}
CronTask.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        action: {
            type: Sequelize.STRING(55),
            allowNull: false
        },
        cronTime: {
            type: Sequelize.STRING(55),
            allowNull: false
        },
        params: {
            type: Sequelize.JSON,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'disabled', 'deleted'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'CronTask',
        tableName: 'cron_task',
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
);

module.exports = CronTask;
