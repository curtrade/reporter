const sequelize = require('../sequelize-env.js');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Payment extends Model {}
Payment.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        providerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'ps_provider_id'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'datetime'
        },
        data: {
            type: Sequelize.JSON,
            allowNull: false,
            field: 'req_query'
        }
    },
    {
        sequelize,
        modelName: 'payments',
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
);

module.exports = Payment;
