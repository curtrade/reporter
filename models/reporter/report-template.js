const sequelize = require('../sequelize-env.js');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class ReportTemplate extends Model {}
ReportTemplate.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        providerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        columns: {
            type: Sequelize.JSON,
            allowNull: false
        },
        format: {
            type: Sequelize.ENUM('html', 'dbf'),
            allowNull: false
        },
        recipients: {
            type: Sequelize.JSON,
            allowNull: false
        },
        customTemplateId: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        encoding: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('on', 'off'),
            allowNull: false,
            field: 'report_status'
        }
    },
    {
        sequelize,
        modelName: 'ReportTemplate',
        tableName: 'provider_report',
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
);

module.exports = ReportTemplate;
