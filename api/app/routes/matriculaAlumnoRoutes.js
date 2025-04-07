'use strict';

const express = require('express');
const matriculaAlumnoController = require('../controllers/matriculaAlumnoController');
const auth = require('../middlewares/auth'); // Si quieres proteger esta ruta, descomenta la siguiente línea
const apiRoutes = express.Router();

apiRoutes.get('/getClasesAlumno/:alumnoId', /*auth.isAuth,*/ async (req, res) => await matriculaAlumnoController.getClasesAlumno(req, res));

module.exports = apiRoutes;