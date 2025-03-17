'use strict'

// Importa los tipos de datos de Sequelize
const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    // Definición de los atributos de la tabla 'alumno'
    const attributes = {
        alumnoId: {
            type: DataTypes.INTEGER,
            primaryKey : true, // Define la clave primaria
        },
        nombre: {
            type: DataTypes.STRING(45)// Define el nombre con un límite de 45 caracteres
        },
        facultadId: {
            type: DataTypes.STRING(45)// Define la facultad a la que pertenece el alumno
        }
    }
    // Opciones de configuración para el modelo
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']} // Excluye automáticamente estas columnas
        },
        scopes: {}, // Espacio reservado para futuros scopes
        tableName: 'alumno', // Nombre de la tabla en la base de datos
        timestamps: 'false' // Deshabilita las marcas de tiempo automáticas
    }
    
    // Define y retorna el modelo 'alumno'
    return sequelize.define('alumno', attributes, options);
}