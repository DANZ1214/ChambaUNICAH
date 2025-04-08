'use strict';

// Importa los módulos necesarios: lodash para utilidades, Sequelize para ORM, fs para sistema de archivos y dotenv para variables de entorno.
const { reject } = require('lodash');
const Sequelize = require('sequelize');
const fs = require('fs');
require('dotenv').config();

/**
 * Crea una instancia de Sequelize para la conexión a la base de datos.
 *
 * @module dbConfig
 */
const sequelizeInstance = new Sequelize(
    process.env.DB, process.env.USER, process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        port: process.env.MY_SQL_PORT,
        dialectOption: {
            connectionTimeout: 10000 // Tiempo de espera para la conexión en milisegundos.
        },
        ssl: {
            rejectUnauthorized: true, // Rechaza conexiones con certificados no autorizados.
            ca: fs.readFileSync('./ca.pem').toString(), // Lee el certificado CA desde el archivo ca.pem.
        },
        pool: {
            max: parseInt(process.env.POOL__MAX), // Número máximo de conexiones en el pool.
            min: parseInt(process.env.POOL__MIN), // Número mínimo de conexiones en el pool.
            acquire: parseInt(process.env.POOL__ACQUIRE), // Tiempo máximo para adquirir una conexión del pool.
            idle: parseInt(process.env.POOL__IDLE) // Tiempo máximo que una conexión puede estar inactiva en el pool.
        }
    }
);

// Crea un objeto para almacenar la instancia de Sequelize y los modelos.
const db = {};

// Asigna la clase Sequelize y la instancia de sequelize al objeto db.
db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;

/**
 * Importa y define los modelos de la base de datos.
 *
 * @name models
 */
// Importa y define el modelo de alumno.
db.alumno = require('../models/alumnoModels')(sequelizeInstance, Sequelize);
// Importa y define el modelo de clase.
db.clase = require('../models/claseModels')(sequelizeInstance, Sequelize);
// Importa y define el modelo de docente.
db.docente = require('../models/docenteModels')(sequelizeInstance, Sequelize);
// Importa y define el modelo de usuario.
db.user = require('../models/userModels')(sequelizeInstance, Sequelize);
// Importa y define el modelo de excusa.
db.excusa = require('../models/excusasModels')(sequelizeInstance, Sequelize);

db.matricula = require('../models/matriculaModels')(sequelizeInstance, Sequelize);

db.excusaClase = require('../models/excusaClaseModels')(sequelizeInstance, Sequelize); // Nueva importación

// Definir las asociaciones
db.excusa.belongsToMany(db.clase, { through: db.excusaClase, foreignKey: 'id_excusa' });
db.clase.belongsToMany(db.excusa, { through: db.excusaClase, foreignKey: 'id_clase' });

// Nueva asociación:
db.matricula.belongsTo(db.clase, { foreignKey: 'id_clase', as: 'clase' });
db.excusa.belongsTo(db.alumno, { foreignKey: 'alumnoId', as: 'alumno' });


// Exporta el objeto db para que pueda ser utilizado en otros módulos.
module.exports = db;
