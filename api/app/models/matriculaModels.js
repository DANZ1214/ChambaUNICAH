'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        matriculaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        alumnoId: {
            type: DataTypes.STRING(13), // VARCHAR(13)
            allowNull: false,
            references: {
                model: 'alumno', // Nombre del modelo (no de la tabla)
                key: 'alumnoId'
            }
        },
        id_clase: {
            type: DataTypes.STRING(10), // VARCHAR(10)
            allowNull: false,
            references: {
                model: 'clases', 
                key: 'id_clase'
            }
        },
        docenteId: {
            type: DataTypes.STRING(13), // VARCHAR(13)
            allowNull: false,
            references: {
                model: 'docente', 
                key: 'docenteId'
            }
        },
        id_excusa: {
            type: DataTypes.INTEGER,
            allowNull: true, // Permitir NULL
            references: {
                model: 'excusas', 
                key: 'id_excusa'
            }
        },               
        estado: {
            type: DataTypes.ENUM('activo', 'inactivo'), // ENUM
            defaultValue: 'activo',
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        scopes: {},
        tableName: 'matriculas', // Nombre real de la tabla en MySQL
        timestamps: false, // Desactiva los timestamps automáticos
    };

    return sequelize.define('matricula', attributes, options); // Modelo en singular
};