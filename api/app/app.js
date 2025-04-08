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
const matriculaRoutes = require('./routes/matriculaRoutes');
const matriculaAlumnoRoutes = require('./routes/matriculaAlumnoRoutes');


/**
 * Configura el middleware CORS para permitir solicitudes desde cualquier origen.
 */
App.use(
    cors({
        origin: "*", // Permite solicitudes desde cualquier origen. Considera restringir esto en producción.
    })
);

// Configura middleware para el manejo de JSON y datos de formularios.
App.use(express.json({ limit: '10mb' }));
App.use(express.urlencoded({ extended: false }));

/**  
 * Define los endpoints de la API para las diferentes entidades
 */
App.use('/api/unicah/alumno', alumnoRoutes);
App.use('/api/unicah/clase', claseRoutes);
App.use('/api/unicah/docente', docenteRoutes);
App.use('/api/unicah/user', userRoutes);
App.use('/api/unicah/excusa', excusasRoutes);
App.use('/api/unicah/matricula', matriculaRoutes);
App.use('/api/unicah/matriculaAlumno', matriculaAlumnoRoutes);


// Inicia el servidor en el puerto 3008

const PORT = 3008;
App.listen(PORT, '0.0.0.0', () => {
    console.log(`🔥 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
