'use strict'

// Importa los tipos de datos de Sequelize
const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    // Definición de los atributos de la tabla 'docente'
    const attributes = {
        docenteId: {
            type: DataTypes.INTEGER,
            primaryKey : true, // Define la clave primari
        },
        email: {
            type: DataTypes.STRING(45) // Dirección de correo del docente
        },
        nombre: {
            type: DataTypes.STRING(45) // Nombre del docente con un límite de 45 caracteres
        }
    }
    // Opciones de configuración para el modelo
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']} // Excluye automáticamente estas columnas
        },
        scopes: {}, // Espacio reservado para futuros scopes
        tableName: 'docente', // Nombre de la tabla en la base de datos
        timestamps: false // Deshabilita las marcas de tiempo automáticas
    }

     // Define y retorna el modelo 'docente'
    return sequelize.define('docente', attributes, options);
}