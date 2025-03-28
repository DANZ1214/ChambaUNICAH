'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        id_excusa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Añadido para que sea autoincremental
        },
        alumnoId: {
            type: DataTypes.INTEGER,
            allowNull: false, // El ID del alumno es obligatorio
        },
        razon: {
            type: DataTypes.ENUM('Enfermedad', 'Luto', 'Viaje', 'Otro'), // Corregido a ENUM
            allowNull: false, // La razón es obligatoria
        },
        archivo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fecha_solicitud: {
            type: DataTypes.DATE, // Cambiado a DATE para mayor claridad (TIMESTAMP también funcionaría)
            defaultValue: DataTypes.NOW, // Establece el valor por defecto a la fecha y hora actual
        },
        estado: {
            type: DataTypes.STRING(45),
            defaultValue: 'Pendiente', // Establece el estado por defecto como 'Pendiente'
        },
        descripcion: { // Nuevo campo para la descripción
            type: DataTypes.STRING(255),
            allowNull: false, // La descripción es obligatoria
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        scopes: {},
        tableName: 'excusas', // Corregido el nombre de la tabla a 'excusas' (plural)
        timestamps: true, // Reactivamos los timestamps automáticos (createdAt y updatedAt)
    };

    return sequelize.define('excusa', attributes, options);
};