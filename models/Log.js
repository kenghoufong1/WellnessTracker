const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Log extends Model {}

Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        workout_duration: {
            type: DataTypes.TIME,
        },
        hours_of_sleep: {
            type: DataTypes.TIME,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        mood: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'log',
    }
);

module.exports = Log;