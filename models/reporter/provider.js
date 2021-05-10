const sequelize = require('../sequelize-env.js');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Provider extends Model {}
Provider.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(255),
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
