'use strict'

const { reject } = require('lodash');
const Sequelize = require('sequelize');
const fs = require('fs');
require('dotenv').config();

const sequelizeInstance = new Sequelize(
    process.env.DB, process.env.USER, process.env.PASSWORD, 
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        port: process.env.MY_SQL_PORT,
        dialectOption: {
            connectionTimeout: 10000
        },
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('./ca.pem').toString(),
        },
        pool: {
            max: parseInt(process.env.POOL__MAX),
            min: parseInt(process.env.POOL__MIN),
            acquire: parseInt(process.env.POOL__ACQUIRE),
            idle: parseInt(process.env.POOL__IDLE)
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;
db.actor = require('../models/alumnoModels')(sequelizeInstance,Sequelize);

module.exports = db;
