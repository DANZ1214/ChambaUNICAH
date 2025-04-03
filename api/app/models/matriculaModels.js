'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        matriculaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Añadido para que sea autoincremental
        },
        alumnoId: {
            type: DataTypes.INTEGER,
            allowNull: false, // El ID del alumno es obligatorio
        },
        id_clase: {
            type: DataTypes.INTEGER,
            allowNull: false, // El ID del alumno es obligatorio
        },
        docenteId: {
            type: DataTypes.INTEGER,
            allowNull: false, // El ID del alumno es obligatorio
        },
        id_excusa: {
            type: DataTypes.INTEGER,
            allowNull: false, // El ID del alumno es obligatorio
        },               
        estado: {
            type: DataTypes.ENUM('activo', 'inactivo'), // Valores válidos en MySQL
            defaultValue: 'activo', // Cambia el valor por defecto
        },
        fecha_matricula: {
            type: DataTypes.DATE, // Cambiado a DATE para mayor claridad (TIMESTAMP también funcionaría)
            defaultValue: DataTypes.NOW, // Establece el valor por defecto a la fecha y hora actual
        }
    };

    const options = {
        scopes: {},
        tableName: 'matriculas', 
        timestamps: false, 
    };

    return sequelize.define('matriculas', attributes, options);
};