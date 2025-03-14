'use strict'

const express = require('express');
const alumnoController = require('../controllers/claseController');
const apiRoutes = express.Router();

apiRoutes.get('/getClase',async(req, res)=>await
alumnoController.getClase(req, res))

module.exports = apiRoutes;
