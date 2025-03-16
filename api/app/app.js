'use strict';

// Importa los módulos necesarios: express para la creación del servidor, y cors para habilitar CORS.
const express = require('express');
const cors = require('cors');
// Crea una instancia de la aplicación express.
const App = express();

// Importa los enrutadores para las diferentes entidades de la API.
const alumnoRoutes = require('./routes/alumnoRoutes');
const claseRoutes = require('./routes/claseRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const userRoutes = require('./routes/userRoutes');
const excusasRoutes = require('./routes/excusasRoutes');

/**
 * Configura el middleware CORS para permitir solicitudes desde cualquier origen.
 */
App.use(
    cors({
        origin: "*", // Permite solicitudes desde cualquier origen. Considera restringir esto en producción.
    })
);

// Configura middleware para el manejo de JSON y datos de formularios.
App.use(cors()); // Configura CORS (redundante, pero se mantiene para compatibilidad).
App.use(express.json({ limit: '10mb' })); // Habilita el análisis de JSON con un límite de 10MB.
App.use(express.urlencoded({ extended: false })); // Habilita el análisis de datos de formularios codificados en URL.

/**  
 * Define los endpoints de la API para las diferentes entidades
 */

// Asocia los enrutadores a las rutas base de la API.
App.use('/api/unicah/alumno', alumnoRoutes);
App.use('/api/unicah/clase', claseRoutes);
App.use('/api/unicah/docente', docenteRoutes);
App.use('/api/unicah/user', userRoutes);
App.use('/api/unicah/excusa', excusasRoutes);

// Exporta la instancia de la aplicación express para que pueda ser utilizada en otros módulos.
module.exports = App;