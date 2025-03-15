'use strict'


const  {DataTypes}  = require('sequelize')

module.exports = (sequelize) => {
    const attributes = {
        id_clase: {
            type: DataTypes.INTEGER,
            primaryKey : true,
        },
        nombre_clase: {
            type: DataTypes.STRING(45)
        }
    }
    const options = {
        defaultScope: {
            attributes: { exclude: [ 'createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'clases',
        timestamps: 'false'
    }
    return sequelize.define('clases', attributes, options);
}