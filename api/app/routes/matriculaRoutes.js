'use strict';

const express = require('express');
const matriculaController = require('../controllers/matriculaController'); // Corregir nombre
const auth = require('../middlewares/auth');
const apiRoutes = express.Router();

// Ruta para obtener matrícula
apiRoutes.get('/getMatricula', /*auth.isAuth,*/ async (req, res) => await matriculaController.getMatricula(req, res));

// Ruta para insertar matrícula
apiRoutes.post('/insertMatricula', /*auth.isAuth,*/ async (req, res) => await matriculaController.insertMatricula(req, res));

// Actualizar matrícula
apiRoutes.put('/updateMatricula', /*auth.isAuth,*/ async (req, res) => await matriculaController.updateMatricula(req, res));

apiRoutes.delete('/deleteMatricula', /*auth.isAuth,*/ async (req, res) => await matriculaController.deleteMatricula(req, res));

module.exports = apiRoutes;