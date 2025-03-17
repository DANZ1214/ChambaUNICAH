'use strict'

// Importa los tipos de datos de Sequelize
const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    // Definición de los atributos de la tabla 'clases'
    const attributes = {
        id_clase: {
            type: DataTypes.INTEGER,
            primaryKey : true,// Define la clave primaria
        },
        nombre_clase: {
            type: DataTypes.STRING(45) // Nombre de la clase con un límite de 45 caracteres
        }
    }

    // Opciones de configuración para el modelo
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']} // Excluye automáticamente estas columnas
        },
        scopes: {}, // Espacio reservado para futuros scopes
        tableName: 'clases', // Nombre de la tabla en la base de datos
        timestamps: false // Deshabilita las marcas de tiempo automáticas
    }

    // Define y retorna el modelo 'clases'
    return sequelize.define('clases', attributes, options);
}