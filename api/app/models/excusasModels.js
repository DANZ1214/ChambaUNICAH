'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        id_excusa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        alumnoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        razon: {
            type: DataTypes.ENUM('Enfermedad', 'Luto', 'Viaje', 'Otro'),
            allowNull: false,
        },
        archivo: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        fecha_solicitud: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        estado: {
            type: DataTypes.STRING(45),
            defaultValue: 'Pendiente',
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        tableName: 'excusas',
        timestamps: true,
    };

    return sequelize.define('excusa', attributes, options);
};
