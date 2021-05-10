const sequelize = require('../sequelize-env.js');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Provider extends Model {}
Provider.init(
    {
        id: {
            type: Sequelize.STRING(15),
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        data: {
            type: Sequelize.JSON,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Provider',
        tableName: 'provider',
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
);

module.exports = Provider;
