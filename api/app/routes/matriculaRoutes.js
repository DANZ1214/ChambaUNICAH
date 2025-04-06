'use strict';

const express = require('express');
const excusaController = require('../controllers/matriculaController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer'); // Importa tu configuración de Multer
const apiRoutes = express.Router();

apiRoutes.get('/getMatricula', auth.isAuth, async (req, res) => await excusaController.getMatricula(req, res));

module.exports = apiRoutes;