'use strict'

const express = require('express');
const docenteController = require('../controllers/docenteController');
const apiRoutes = express.Router();

apiRoutes.get('/getDocente',async(req, res)=>await
docenteController.getDocente(req, res))

module.exports = apiRoutes;
