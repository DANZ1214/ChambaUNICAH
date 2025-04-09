'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const App = express();

// CORS
App.use(cors({ origin: '*' }));

// Body parsers
App.use(express.json({ limit: '10mb' }));
App.use(express.urlencoded({ extended: false }));

// ✅ SERVIR ARCHIVOS DESDE app/uploads (donde realmente están)
App.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// ✅ RUTA EXTRA MANUAL (por si express.static no responde)
App.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.access(filePath, fs.constants.F_OK, err => {
    if (err) {
      return res.status(404).send('Archivo no encontrado');
    }
    res.sendFile(filePath);
  });
});

// Rutas API
const alumnoRoutes = require('./routes/alumnoRoutes');
const claseRoutes = require('./routes/claseRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const userRoutes = require('./routes/userRoutes');
const excusasRoutes = require('./routes/excusasRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');
const matriculaAlumnoRoutes = require('./routes/matriculaAlumnoRoutes');

App.use('/api/unicah/alumno', alumnoRoutes);
App.use('/api/unicah/clase', claseRoutes);
App.use('/api/unicah/docente', docenteRoutes);
App.use('/api/unicah/user', userRoutes);
App.use('/api/unicah/excusa', excusasRoutes);
App.use('/api/unicah/matricula', matriculaRoutes);
App.use('/api/unicah/matriculaAlumno', matriculaAlumnoRoutes);

module.exports = App;
