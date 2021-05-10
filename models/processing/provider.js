const sequelize = require('../sequelize-env.js');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Provider extends Model {}
Provider.init(
    {
        id: {
            type: Sequelize.STRING(25),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        tableName: '_provider',
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
);

module.exports = Provider;
