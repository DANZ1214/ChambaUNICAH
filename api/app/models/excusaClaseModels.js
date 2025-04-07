'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        excusaClaseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_excusa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'excusas',
                key: 'id_excusa'
            }
        },
        id_clase: {
            type: DataTypes.STRING(10),
            allowNull: false,
            references: {
                model: 'clases',
                key: 'id_clase'
            }
        }
    };

    const options = {
        tableName: 'excusa_clase',
        timestamps: false
    };

    const ExcusaClase = sequelize.define('excusa_clase', attributes, options);

    return ExcusaClase;
};