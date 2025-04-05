'use strict';

require('dotenv').config();

const db = require('./app/config/db');
const App = require('./app/app'); // Este es el archivo donde está configurada tu app de Express
const PORT = process.env.PORT || process.env.APP_Port || 3008;

db.sequelizeInstance.sync()
  .then(() => {
    console.info("✅ Base de Datos Sincronizada");

    App.listen(PORT, () => {
      console.info(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("❌ Error al sincronizar la base de datos:", error);
  });
