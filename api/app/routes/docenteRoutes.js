'use strict'

const express = require('express');
const alumnoController = require('../controllers/docenteController');
const apiRoutes = express.Router();

apiRoutes.get('/getDocente',async(req, res)=>await
alumnoController.getDocente(req, res))

module.exports = apiRoutes;
