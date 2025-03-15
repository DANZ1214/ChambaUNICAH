'use strict'

const express = require('express');
const alumnoController = require('../controllers/alumnoController');
const apiRoutes = express.Router();

apiRoutes.get('/getAlumno',async(req, res) => await alumnoController.getAlumno(req, res));
apiRoutes.post('/insertAlumno',async(req, res) => await alumnoController.insertAlumno(req, res));
apiRoutes.delete('/deleteAlumno',async(req, res) => await alumnoController.deleteAlumno(req, res));
apiRoutes.put('/updateAlumno', async (req, res) => await alumnoController.updateAlumno(req, res));


module.exports = apiRoutes;
