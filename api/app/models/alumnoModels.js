'use strict'


const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    const attributes = {
        alumnoId: {
            type: DataTypes.INTEGER,
            primarykey : true,
        },
        nombre: {
            type: DataTypes.STRING(45)
        },
        facultadId: {
            type: DataTypes.STRING(45)
        }
    }
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'alumno',
        timestamps: 'false'
    }
    return sequelize.define('alumno', attributes, options);
}