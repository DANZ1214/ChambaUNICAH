'use strict'

const express = require('express');
const alumnoController = require('../controllers/alumnoController');
const apiRoutes = express.Router();

apiRoutes.get('/getAlumno',async(req, res) => await alumnoController.getAlumno(req, res));
apiRoutes.post('/insertAlumno',async(req, res) => await alumnoController.insertAlumno(req, res));

module.exports = apiRoutes;
