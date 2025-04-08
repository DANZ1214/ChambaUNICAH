'use strict';

const express = require('express');
const matriculaAlumnoController = require('../controllers/matriculaAlumnoController');
const auth = require('../middlewares/auth'); // Puedes activarlo si deseas proteger rutas

const apiRoutes = express.Router();

// Ruta para obtener las clases de un alumno
apiRoutes.get('/getClasesAlumno/:alumnoId', /* auth.isAuth, */ async (req, res) => {
  await matriculaAlumnoController.getClasesAlumno(req, res);
});

// Ruta para obtener las clases de un docente
apiRoutes.get('/getClasesDocente/:docenteId', /* auth.isAuth, */ async (req, res) => {
  await matriculaAlumnoController.getClasesDocente(req, res);
});

module.exports = apiRoutes;
