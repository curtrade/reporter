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
            type: Sequelize.STRING(25),
            allowNull: false,
            field: 'ps_provider_id'
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        columns: {
            type: Sequelize.JSON,
            allowNull: false,
            field: 'report_template'
        },
        format: {
            type: Sequelize.ENUM('html', 'dbf', 'xlsx', 'txt'),
            allowNull: false,
            field: 'registry_type'
        },
        customTemplateId: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'report_custom_template_id'
        },
        filename: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'report_filename'
        },
        encoding: {
            type: Sequelize.STRING(12),
            allowNull: false,
            field: 'report_encoding'
        },
        status: {
            type: Sequelize.ENUM('active', 'disabled', 'deleted'),
            allowNull: false,
            field: 'report_status'
        }
    },
    {
        sequelize,
        modelName: 'ReportTemplate',
        tableName: 'providers',
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
);

module.exports = ReportTemplate;
