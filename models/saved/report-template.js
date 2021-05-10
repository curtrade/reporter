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
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(127),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        columns: {
            type: Sequelize.JSON,
            allowNull: false
        },
        format: {
            type: Sequelize.ENUM('html', 'dbf', 'xlsx', 'txt'),
            allowNull: false
        },
        customTemplateId: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        filename: {
            type: Sequelize.STRING(127),
            allowNull: false
        },
        encoding: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'disabled', 'deleted'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ReportTemplate',
        tableName: 'report_template',
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
);

module.exports = ReportTemplate;
