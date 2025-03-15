'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false // Se requiere un valor manual
        },
        pass: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        tableName: 'user',
        timestamps: false
    };

    return sequelize.define('user', attributes, options);
};
