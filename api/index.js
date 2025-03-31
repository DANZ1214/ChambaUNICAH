'use strict'

const db = require('./app/config/db');
const App = require('./app/app');
require('dotenv').config();

const PORT = process.env.PORT || process.env.APP_Port;

db.sequelizeInstance.sync()
    .then(() => {
        console.info("Base de Datos Sincronizada");
        
    })
    .catch(error => console.error(error));