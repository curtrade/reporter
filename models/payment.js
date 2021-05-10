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
            type: Sequelize.STRING(15),
            allowNull: false
        },
        data: {
            type: Sequelize.JSON,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Payment',
        tableName: 'payment',
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
);

module.exports = Payment;
