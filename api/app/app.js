'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');// NECESARIO para servir archivos

const App = express();

// Rutas
const alumnoRoutes = require('./routes/alumnoRoutes');
const claseRoutes = require('./routes/claseRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const userRoutes = require('./routes/userRoutes');
const excusasRoutes = require('./routes/excusasRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const matriculaAlumnoRoutes = require('./routes/matriculaAlumnoRoutes');

// CORS
App.use(
    cors({
        origin: "*",
    })
);

// Body parsers
App.use(express.json({ limit: '10mb' }));
App.use(express.urlencoded({ extended: false }));

// Rutas API
App.use('/api/unicah/alumno', alumnoRoutes);
App.use('/api/unicah/clase', claseRoutes);
App.use('/api/unicah/docente', docenteRoutes);
App.use('/api/unicah/user', userRoutes);
App.use('/api/unicah/excusa', excusasRoutes);
App.use('/api/unicah/matricula', matriculaRoutes);
App.use('/api/unicah/matriculaAlumno', matriculaAlumnoRoutes);

// ✅ Servir archivos de /uploads como públicos
App.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Arrancar el server
const PORT = 3008;
App.listen(PORT, '0.0.0.0', () => {
    console.log(`🔥 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
