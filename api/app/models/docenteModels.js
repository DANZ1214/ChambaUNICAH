'use strict'


const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    const attributes = {
        docenteId: {
            type: DataTypes.INTEGER,
            primarykey : true,
        },
        email: {
            type: DataTypes.STRING(45)
        },
        nombre: {
            type: DataTypes.STRING(45)
        }
    }
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'docente',
        timestamps: 'false'
    }
    return sequelize.define('docente', attributes, options);
}