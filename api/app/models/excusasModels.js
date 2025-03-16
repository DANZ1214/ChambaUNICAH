'use strict'


const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    const attributes = {
        id_excusa: {
            type: DataTypes.INTEGER,
            primaryKey : true,
        },
        alumboId: {
            type: DataTypes.INTEGER
        },
        razon: {
            type: DataTypes.INTEGER
        },
        archivo: {
            type: DataTypes.INTEGER
        },
        fecha_solicitud: {
            type: DataTypes.INTEGER
        },
        estado: {
            type: DataTypes.STRING(45)
        }
    }
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'excusa',
        timestamps: 'false'
    }
    return sequelize.define('excusa', attributes, options);
}