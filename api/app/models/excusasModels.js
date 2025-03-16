'use strict';

// Importa la clase DataTypes de Sequelize para definir los tipos de datos de las columnas.
const { DataTypes } = require('sequelize');

/**
 * Define el modelo de la tabla 'excusa' en la base de datos utilizando Sequelize.
 */
module.exports = (sequelize) => {
    // Define los atributos (columnas) de la tabla 'excusa'.
    const attributes = {
        /**
         * Identificador único de la excusa.
         */
        id_excusa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        /**
         * Identificador del alumno asociado a la excusa.
         */
        alumboId: {
            type: DataTypes.INTEGER,
        },
        /**
         * Razón de la excusa.
         */
        razon: {
            type: DataTypes.INTEGER,
        },
        /**
         * Referencia al archivo adjunto a la excusa.
         */
        archivo: {
            type: DataTypes.INTEGER,
        },
        /**
         * Fecha de solicitud de la excusa.
         */
        fecha_solicitud: {
            type: DataTypes.INTEGER,
        },
        /**
         * Estado de la excusa (por ejemplo, 'pendiente', 'aprobada', 'rechazada').
         */
        estado: {
            type: DataTypes.STRING(45),
        },
    };

    // Define las opciones del modelo.
    const options = {
        // Ámbito predeterminado del modelo, excluye las columnas 'createdAt' y 'updatedAt' en las consultas.
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        // Ámbitos adicionales del modelo (actualmente vacío).
        scopes: {},
        // Nombre de la tabla en la base de datos.
        tableName: 'excusa',
        // Indica que la tabla no tiene columnas 'createdAt' y 'updatedAt' (desactiva los timestamps automáticos).
        timestamps: false,
    };

    // Define el modelo 'excusa' utilizando Sequelize y lo devuelve.
    return sequelize.define('excusa', attributes, options);
};