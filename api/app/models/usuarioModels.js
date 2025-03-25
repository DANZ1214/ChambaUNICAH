'use strict';

// Importa la clase DataTypes de Sequelize para definir los tipos de datos de las columnas.
const { DataTypes } = require('sequelize');

/**
 * Define el modelo de la tabla 'user' en la base de datos utilizando Sequelize.
 */
module.exports = (sequelize) => {
    // Define los atributos (columnas) de la tabla 'user'.
    const attributes = {
        /**
         * Identificador único del usuario.
         */
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        /**
         * Contraseña del usuario.
         */
        pass: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
        
    };

    

    // Define el modelo 'user' utilizando Sequelize y lo devuelve.
    return sequelize.define('usuario', attributes, options);
};
